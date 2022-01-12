/**
 * DataSource for user subscription data (Web Push API) stored in IDB.
 */
export default class TeqFw_Web_Push_Front_DSource_Subscription {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Front_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Store} */
        const store = spec['TeqFw_Web_Front_Store$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/subscription`;
        let _cache;

        // INSTANCE METHODS
        /**
         * Get user data from IDB or generate new one and sae to IDB.
         * @return {Promise<TeqFw_Web_Push_Shared_Dto_Subscription.Dto>}
         */
        this.get = async () => {
            if (!_cache) _cache = await store.get(STORE_KEY);
            return _cache;
        }

        /**
         * @param {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} data
         * @return {Promise<void>}
         */
        this.set = async (data) => {
            _cache = data;
            await store.set(STORE_KEY, data);
        }

    }
}
