/**
 * Route data for service to load server key to initiate Web Push subscription.
 *
 * @namespace TeqFw_Web_Push_Shared_WAPI_Load_ServerKey
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_WAPI_Load_ServerKey';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Load_ServerKey
 */
export class Request {}

/**
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Load_ServerKey
 */
export class Response {
    /** @type {string} */
    key;
}

/**
 * Factory to create new DTOs.
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Load_ServerKey
 * @implements TeqFw_Web_Back_Api_WAPI_IRoute
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Shared_Defaults$'];
        const {castString} = spec['TeqFw_Core_Shared_Util_Cast'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {Request|Object|null} data
         * @return {TeqFw_Web_Push_Shared_WAPI_Load_ServerKey.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            return res;
        }

        /**
         * @param {Response|Object|null} data
         * @return {TeqFw_Web_Push_Shared_WAPI_Load_ServerKey.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.key = castString(data?.key);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_LOAD_SERVER_KEY}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
