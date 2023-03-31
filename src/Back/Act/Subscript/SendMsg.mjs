/**
 * Send message to the subscription.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_SendMsg
 */
// MODULE'S IMPORT
import webPush from 'web-push';

// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_SendMsg';

// MODULE'S FUNCS
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {TeqFw_Db_Back_RDb_Meta_IEntity|TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const rdbSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$'];
    /** @type {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} */
    const actLoadKeys = spec['TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$'];

    // VARS
    /** @type {TeqFw_Web_Push_Back_Api_Dto_Config_Local} */
    const cfgLocal = config.getLocal(DEF.SHARED.NAME);
    const email = `mailto:${cfgLocal?.email}`;
    const {publicKey, privateKey} = actLoadKeys();

    // INNER FUNCTIONS
    /**
     *
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {string} title
     * @param {string} body
     * @param {number} frontId
     * @return {Promise<{subscriptId, code}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_SendMsg
     */
    async function act({trx, title, body, frontId}) {
        let res;
        try {
            /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Dto} */
            const found = await crud.readOne(trx, rdbSubscript, frontId);
            if (found) {
                const endpoint = found.endpoint;
                const keys = {p256dh: found.key_p256dh, auth: found.key_auth};
                webPush.setVapidDetails(
                    email,
                    publicKey,
                    privateKey
                );
                const pushSubscription = {endpoint, keys};
                const payload = {title, body};
                res = await webPush.sendNotification(pushSubscription, JSON.stringify(payload));
            }
        } catch (e) {
            console.log(e);
        }
        return res;
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
