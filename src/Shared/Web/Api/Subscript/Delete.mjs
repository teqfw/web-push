/**
 * Delete the WebPush subscription on the back.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete
 */
class Request {
    static namespace = NS;
    /** @type {number} */
    frontRef;
}

/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete
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
export default class TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Request} [data]
         * @return {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.frontRef = cast.int(data?.frontRef);
            return res;
        };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Response} [data]
         * @returns {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.success = cast.boolean(data?.success);
            return res;
        };
    }

}
