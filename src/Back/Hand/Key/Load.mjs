/**
 * Process to transfer Web Push subscription keys to the front.
 */
export default class TeqFw_Web_Push_Back_Hand_Key_Load {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Core_Back_Mod_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_Mod_Event_Bus$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request} */
        const esfReq = spec['TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response} */
        const esbRes = spec['TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response$'];
        /** @type {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} */
        const actLoad = spec['TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$'];

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
