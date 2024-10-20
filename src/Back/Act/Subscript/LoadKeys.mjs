/**
 * Load VAPID keys for WebPush subscriptions.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
 */
// MODULE'S IMPORTS
import {existsSync, writeFileSync} from 'fs';
import {join} from 'path';
import webPush from 'web-push';

// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_LoadKeys';
/**
 * @param {TeqFw_Web_Push_Back_Defaults} DEF
 * @param {TeqFw_Core_Back_Config} config
 * @param {TeqFw_Core_Back_Util.readJson|function} readJson
 */
export default function (
    {
        TeqFw_Web_Push_Back_Defaults$: DEF,
        TeqFw_Core_Back_Config$: config,
        'TeqFw_Core_Back_Util.readJson': readJson,
    }
) {
    // FUNCS
    /**
     * @return {{publicKey: string, privateKey: string}}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
     */
    function act() {
        const root = config.getPathToRoot();
        const path = join(root, DEF.FILE_VAPID_KEYS);
        if(existsSync(path)) {
            const {publicKey, privateKey} = readJson(path);
            return {publicKey, privateKey};
        } else {
            const vapidKeys = webPush.generateVAPIDKeys();
            const data = JSON.stringify(vapidKeys);
            writeFileSync(path, data);
            return vapidKeys;
        }
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
