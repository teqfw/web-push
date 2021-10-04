/**
 * Load server key to initiate Web Push subscription.
 *
 * @namespace TeqFw_Web_Push_Back_Service_Load_ServerKey
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Service_Load_ServerKey';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class TeqFw_Web_Push_Back_Service_Load_ServerKey {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];
        /** @type {TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey.Factory} */
        const route = spec['TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Push_Shared_Service_Route_Load_ServerKey.Response} */
                const out = context.getOutData();
                /** @type {TeqFw_Web_Push_Back_Api_Dto_Config_Local} */
                const cfgLocal = config.getLocal(DEF.SHARED.NAME);
                out.key = cfgLocal?.keyPublic;
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
