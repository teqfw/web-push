/**
 * Load VAPID keys for WebPush subscriptions.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
 */
// MODULE'S IMPORTS
import {join} from "path";


// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_LoadKeys';

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Back_Util.readJson|function} */
    const readJson = spec['TeqFw_Core_Back_Util.readJson'];

    // DEFINE INNER FUNCTIONS
    /**
     * @param {*} opts
     * @return {{publicKey: string, privateKey: string}}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_LoadKeys
     */
    function act(opts) {
        const root = config.getBoot().projectRoot;
        const path = join(root, DEF.FILE_VAPID_KEYS);
        const {publicKey, privateKey} = readJson(path);
        return {publicKey, privateKey};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    return act;
}
