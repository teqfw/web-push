/**
 * Load VAPID keys for WebPush subscriptions.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
 */
// MODULE'S IMPORTS
import {existsSync, writeFileSync} from 'fs';
import {join} from "path";
import webPush from "web-push";

// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_LoadKeys';

export default function (spec) {
    // DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Back_Util.readJson|function} */
    const readJson = spec['TeqFw_Core_Back_Util.readJson'];

    // ENCLOSED FUNCS
    /**
     * @return {{publicKey: string, privateKey: string}}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
     */
    function act() {
        const root = config.getBoot().projectRoot;
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
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    return act;
}
