/**
 * Process to transfer Web Push subscription keys to the front.
 */
export default class TeqFw_Web_Push_Back_Hand_Key_Load {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Event_Back_Mod_Channel} eventsBack
     * @param {TeqFw_Web_Event_Back_Mod_Portal_Front} portalFront
     * @param {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request} esfReq
     * @param {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response} esbRes
     * @param {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} actLoad
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Event_Back_Mod_Channel$: eventsBack,
            TeqFw_Web_Event_Back_Mod_Portal_Front$: portalFront,
            TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request$: esfReq,
            TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response$: esbRes,
            TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$: actLoad,
        }
    ) {
        // VARS
        let _cache;

        // MAIN
        eventsBack.subscribe(esfReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto} meta
         */
        async function onRequest({data, meta}) {
            // get from process cache or load keys from file
            if (!_cache) {
                /** @type {{publicKey: string, privateKey: string}} */
                const keys = actLoad();
                _cache = keys?.publicKey;
                logger.info(`Public key for Web Push subscription is cached by process.`);
            }
            const message = esbRes.createDto();
            message.data.key = _cache;
            message.meta.frontUUID = meta.frontUUID;
            portalFront.publish(message);
        }
    }
}
