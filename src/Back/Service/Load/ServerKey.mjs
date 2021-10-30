/**
 * Load server key to initiate Web Push subscription.
 *
 * @namespace TeqFw_Web_Push_Back_Service_Load_ServerKey
 */
// MODULE'S IMPORT
import {join} from "path";

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
        /** @type {TeqFw_Core_Back_Util.readJson|function} */
        const readJson = spec['TeqFw_Core_Back_Util.readJson'];
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
                // load key from local file
                const root = config.getBoot().projectRoot;
                const path = join(root, DEF.FILE_VAPID_KEYS);
                const keys = readJson(path);
                out.key = keys?.publicKey;
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
