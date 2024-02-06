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
/**
 * @param {TeqFw_Web_Push_Back_Defaults} DEF
 * @param {TeqFw_Core_Back_Config} config
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 * @param {TeqFw_Db_Back_RDb_Meta_IEntity|TeqFw_Web_Push_Back_RDb_Schema_Subscript} rdbSubscript
 * @param {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} actLoadKeys
 */
export default function (
    {
        TeqFw_Web_Push_Back_Defaults$: DEF,
        TeqFw_Core_Back_Config$: config,
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
        TeqFw_Web_Push_Back_RDb_Schema_Subscript$: rdbSubscript,
        TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$: actLoadKeys,
    }
) {
    // VARS
    /** @type {TeqFw_Web_Push_Back_Plugin_Dto_Config_Local.Dto} */
    const cfgLocal = config.getLocal(DEF.SHARED.NAME);
    const email = `mailto:${cfgLocal?.email ?? 'info@teqfw.com'}`;
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
            /** @type {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto} */
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
