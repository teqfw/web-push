/**
 * Web Push subscription model encapsulates logic to work with Web Push API.
 *
 * Model stores front subscription data in IDB singletons store (from @teqfw/web).
 *
 * @namespace TeqFw_Web_Push_Front_Mod_Subscription
 */
export default class TeqFw_Web_Push_Front_Mod_Subscription {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Api_Front_Web_Connect} connApi
     * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load} apiKeyLoad
     * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create} apiCreate
     * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete} apiDelete
     * @param {TeqFw_Web_Push_Shared_Dto_Subscription} dtoSubscript
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Api_Front_Web_Connect$: connApi,
            TeqFw_Web_Push_Shared_Web_Api_Key_Load$: apiKeyLoad,
            TeqFw_Web_Push_Shared_Web_Api_Subscript_Create$: apiCreate,
            TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete$: apiDelete,
            TeqFw_Web_Push_Shared_Dto_Subscription$: dtoSubscript,
        }
    ) {
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
         * Return 'true' if there is subscription data in the SW.
         * @return {Promise<boolean>}
         */
        this.hasSubscription = async () => {
            const sw = await navigator.serviceWorker.ready;
            const subs = await sw.pushManager.getSubscription();
            return !!(subs);
        }

        /**
         * Load public key from server to subscribe to use Web Push API then subscribe.
         *
         * @param {number} frontRef backend ID for the related front
         * @return {Promise<boolean>} 'true' if subscription is succeeded
         */
        this.subscribe = async (frontRef) => {
            // FUNCS
            /**
             * Load public server key for asymmetric encryption.
             * @return {Promise<string>}
             */
            async function loadServerKey() {
                const req = apiKeyLoad.createReq();
                req.frontRef = frontRef;
                /** @type {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Response} */
                const rs = await connApi.send(req, apiKeyLoad);
                return rs?.key;
            }

            /**
             * Save subscription to back and get frontId from server.
             *
             * @param {number} frontRef backend ID for the related front
             * @param {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} subs
             * @return {Promise<boolean>}
             */
            async function saveSubscription(frontRef, subs) {
                const req = apiCreate.createReq();
                req.frontRef = frontRef;
                req.subscription = subs;
                /** @type {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Response} */
                const rs = await connApi.send(req, apiCreate);
                return rs?.success;
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
                const sub = await sw.pushManager.getSubscription();
                if (sub) await sub.unsubscribe();
                return await sw.pushManager.subscribe(opts);
            }

            // MAIN
            let res = false;
            try {
                logger.info(`Create new WebPush subscription for front '${frontRef}'.`);
                const key = await loadServerKey();
                logger.info(`The server's VAPID key is loaded.`);
                /** @type {PushSubscription} */
                const pushSubscription = await subscribePush(key);
                logger.info(`The browser vendor has accepted the subscription.`);
                // save subscription to IDB Store
                const obj = pushSubscription.toJSON();
                // noinspection JSCheckFunctionSignatures
                const dto = dtoSubscript.createDto(obj);
                res = await saveSubscription(frontRef, dto);
                if (res) {
                    logger.info(`User keys are stored on the back. Web Push API subscription for this front is done.`);
                } else
                    logger.error(`Cannot save WebPush API subscription on the back.`);
            } catch (e) {
                logger.error(e);
            }
            return res;
        }

        /**
         * @param {number} frontRef backend ID for the related front
         * @return {Promise<boolean>} 'true' if unsubscription is succeeded
         */
        this.unsubscribe = async function (frontRef) {
            logger.info(`Delete the WebPush API subscription (front: ${frontRef}).`);
            const sw = await navigator.serviceWorker.ready;
            const sub = await sw.pushManager.getSubscription();
            if (sub) {
                await sub.unsubscribe();
                logger.info(`The WebPush API subscription is deleted on the front '${frontRef}'.`);
            }
            const req = apiDelete.createReq();
            req.frontRef = frontRef;
            /** @type {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Response} */
            const rs = await connApi.send(req, apiDelete);
            if (rs?.success)
                logger.info(`The WebPush API subscription is deleted on the back.`);
            else
                logger.error(`The WebPush API subscription is not deleted on the back.`);
            return rs?.success;
        }
    }
}
