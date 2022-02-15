/**
 * Web Push subscription model encapsulates logic to work with Web Push API.
 *
 * Model stores front subscription data in IDB singletons store (from @teqfw/web).
 *
 * @namespace TeqFw_Web_Push_Front_Mod_Subscription
 */
export default class TeqFw_Web_Push_Front_Mod_Subscription {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Push_Front_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_App_Logger} */
        const logger = spec['TeqFw_Web_Front_App_Logger$'];
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
        const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request} */
        const esfKeyReq = spec['TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response} */
        const esbKeyRes = spec['TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response$'];
        /** @type {TeqFw_Web_Push_Shared_Dto_Subscription} */
        const dtoSubscript = spec['TeqFw_Web_Push_Shared_Dto_Subscription$'];
        /** @type {TeqFw_Web_Front_Mod_Store_Singleton} */
        const storeSingle = spec['TeqFw_Web_Front_Mod_Store_Singleton$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request} */
        const esfSaveReq = spec['TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response} */
        const esbSaveRes = spec['TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/subscription`;
        let _cache;

        // INSTANCE METHODS
        /**
         * Return 'true' if browser Web Push API compliant.
         * @return {Promise<boolean>}
         */
        this.canSubscribe = async () => {
            const sw = await navigator.serviceWorker.ready;
            return (sw.pushManager !== undefined);
        }

        /**
         * Get subscription data from IDB.
         * @return {Promise<TeqFw_Web_Push_Shared_Dto_Subscription.Dto>}
         */
        this.get = async () => {
            if (!_cache) _cache = await storeSingle.get(STORE_KEY);
            return _cache;
        }

        /**
         * Return 'true' if there is subscription data stored in IDB.
         * @return {Promise<boolean>}
         */
        this.hasSubscription = async () => {
            /** @type {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} */
            const sub = await this.get();
            return (typeof sub?.endpoint === 'string');
        }

        /**
         * Load public key from server to subscribe to use Web Push API then subscribe.
         * @return {Promise<boolean>} 'true' if subscription is succeeded
         */
        this.subscribe = async () => {
            // ENCLOSED FUNCTIONS
            /**
             * Load public server key for asymmetric encryption.
             * @return {Promise<string|null>}
             */
            async function loadServerKey() {
                return new Promise((resolve) => {
                    // ENCLOSED VARS
                    let idFail, sub;

                    // ENCLOSED FUNCTIONS
                    /**
                     * @param {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response.Dto} data
                     */
                    function onResponse({data}) {
                        clearTimeout(idFail);
                        resolve(data.key);
                        eventsFront.unsubscribe(sub);
                    }

                    // MAIN
                    sub = eventsFront.subscribe(esbKeyRes.getEventName(), onResponse);
                    idFail = setTimeout(() => {
                        eventsFront.unsubscribe(sub);
                        resolve(null);
                    }, DEF.SHARED.MOD_WEB.TIMEOUT_EVENT_RESPONSE); // return nothing after timeout
                    // request data from back
                    const message = esfKeyReq.createDto();
                    portalBack.publish(message);
                });
            }

            /**
             * Save subscription to back and get frontId from server.
             * @param {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} data
             * @return {Promise<number|null>}
             */
            async function saveSubscription(data) {
                return new Promise((resolve) => {
                    // ENCLOSED VARS
                    let idFail, sub;

                    // ENCLOSED FUNCS
                    /**
                     * @param {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto} data
                     */
                    function onResponse({data}) {
                        clearTimeout(idFail);
                        resolve(data.frontId);
                        eventsFront.unsubscribe(sub);
                    }

                    // MAIN
                    sub = eventsFront.subscribe(esbSaveRes.getEventName(), onResponse);
                    idFail = setTimeout(() => {
                        eventsFront.unsubscribe(sub);
                        resolve(null);
                    }, DEF.SHARED.MOD_WEB.TIMEOUT_EVENT_RESPONSE); // return nothing after timeout
                    // request the back to perform operation
                    const event = esfSaveReq.createDto();
                    event.data.subscription = data;
                    portalBack.publish(event);
                });
            }

            /**
             * Send Web Push API subscription request to the browser vendor.
             * @param {string} key loaded server's public key to use with Push API
             * @return {Promise<PushSubscription>}
             */
            async function subscribePush(key) {
                /** @type {PushSubscriptionOptionsInit} */
                const opts = {
                    userVisibleOnly: true,
                    applicationServerKey: key
                };
                const sw = await navigator.serviceWorker.ready;
                return await sw.pushManager.subscribe(opts);
            }

            // MAIN
            let res = false;
            try {
                const key = await loadServerKey();
                /** @type {PushSubscription} */
                const pushSubscription = await subscribePush(key);
                // save subscription to IDB Store
                const obj = pushSubscription.toJSON();
                // noinspection JSCheckFunctionSignatures
                const dto = dtoSubscript.createDto(obj);
                const frontId = await saveSubscription(dto);
                if (frontId) {
                    dto.frontId = frontId;
                    await storeSingle.set(STORE_KEY, dto);
                    res = true;
                    _cache = dto;
                    logger.info(`Web Push API subscription for the user is done. Keys are stored to IDB.`);
                }
            } catch (e) {
                logger.error(e);
            }
            return res;
        }
    }
}
