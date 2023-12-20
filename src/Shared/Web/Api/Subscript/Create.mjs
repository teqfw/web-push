/**
 * Create the WebPush subscription on the back.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Web_Api_Subscript_Create';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Subscript_Create
 */
class Request {
    static namespace = NS;
    /** @type {number} */
    frontRef;
    /** @type {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} */
    subscription;
}

/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Subscript_Create
 */
class Response {
    static namespace = NS;
    /**
     * @type {boolean}
     */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class TeqFw_Web_Push_Shared_Web_Api_Subscript_Create {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast.castBoolean|function} castBoolean
     * @param {TeqFw_Core_Shared_Util_Cast.castInt|function} castInt
     * @param {TeqFw_Web_Push_Shared_Dto_Subscription} dtoSubscript
     */
    constructor(
        {
            'TeqFw_Core_Shared_Util_Cast.castBoolean': castBoolean,
            'TeqFw_Core_Shared_Util_Cast.castInt': castInt,
            TeqFw_Web_Push_Shared_Dto_Subscription$: dtoSubscript,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Request} [data]
         * @return {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.frontRef = castInt(data?.frontRef);
            res.subscription = dtoSubscript.createDto(data?.subscription);
            return res;
        };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Response} [data]
         * @returns {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.success = castBoolean(data?.success);
            return res;
        };
    }

}
