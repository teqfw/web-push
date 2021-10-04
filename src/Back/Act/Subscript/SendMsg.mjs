/**
 * Send message to the subscription.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_SendMsg
 */
// MODULE'S IMPORT
import webPush from 'web-push';

// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_SendMsg';

/**
 * @memberOf TeqFw_Web_Push_Back_Act_Subscript_SendMsg
 */
const RESULT_CODE = {
    DUPLICATE: 'duplicate',
    SUCCESS: 'success',
}
Object.freeze(RESULT_CODE);

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];

    // DEFINE WORKING VARS / PROPS

    // DEFINE INNER FUNCTIONS
    /**
     *
     * @param title
     * @param body
     * @param endpoint
     * @param auth
     * @param p256dh
     * @return {Promise<{subscriptId, code}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_SendMsg
     */
    async function act({title, body, endpoint, auth, p256dh}) {
        // DEFINE INNER FUNCTIONS

        // MAIN FUNCTIONALITY
        let res;

        try {
            /** @type {TeqFw_Web_Push_Back_Api_Dto_Config_Local} */
            const cfgLocal = config.getLocal(DEF.SHARED.NAME);
            webPush.setVapidDetails(
                `mailto:${cfgLocal?.email}`,
                cfgLocal?.keyPublic,
                cfgLocal?.keyPrivate
            );
            const pushSubscription = {endpoint, keys: {p256dh, auth}};
            const payload = {title, body};
            res = await webPush.sendNotification(pushSubscription, JSON.stringify(payload));
        } catch (e) {
            console.log(e);
        }
        return {res};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    act.RESULT_CODE = RESULT_CODE;
    return act;
}
