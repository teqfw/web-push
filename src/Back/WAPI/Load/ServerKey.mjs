/**
 * Load server key to initiate Web Push subscription.
 *
 * @namespace TeqFw_Web_Push_Back_WAPI_Load_ServerKey
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_WAPI_Load_ServerKey';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class TeqFw_Web_Push_Back_WAPI_Load_ServerKey {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Shared_WAPI_Load_ServerKey.Factory} */
        const route = spec['TeqFw_Web_Push_Shared_WAPI_Load_ServerKey#Factory$'];
        /** @type {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} */
        const actLoad = spec['TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Handler_WAPI_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Push_Shared_WAPI_Load_ServerKey.Response} */
                const out = context.getOutData();
                /** @type {{publicKey: string, privateKey: string}} */
                const keys = actLoad();
                out.key = keys?.publicKey;
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
