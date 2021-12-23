/**
 * Route data for service to save user's Web Push subscription data.
 *
 * @namespace TeqFw_Web_Push_Shared_WAPI_Subscript_Save
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_WAPI_Subscript_Save';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Subscript_Save
 */
export class Request {
    /** @type {string} */
    auth;
    /** @type {string} */
    endpoint;
    /** @type {string} */
    p256dh;
    /** @type {number} */
    userId;
}

/**
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Subscript_Save
 */
export class Response {
    /** @type {number} */
    subscriptId;
}

/**
 * Factory to create new DTOs.
 * @memberOf TeqFw_Web_Push_Shared_WAPI_Subscript_Save
 * @implements TeqFw_Web_Back_Api_WAPI_IRoute
 */
export class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Shared_Defaults$'];
        const {castInt, castString} = spec['TeqFw_Core_Shared_Util_Cast'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {Request|Object|null} data
         * @return {TeqFw_Web_Push_Shared_WAPI_Subscript_Save.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.auth = castString(data?.auth);
            res.endpoint = castString(data?.endpoint);
            res.p256dh = castString(data?.p256dh);
            res.userId = castInt(data?.userId);
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {TeqFw_Web_Push_Shared_WAPI_Subscript_Save.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.subscriptId = castInt(data?.subscriptId);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WEB_SUBSCRIPTION_SAVE}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
