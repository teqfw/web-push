/**
 * Load WebPush subscription keys from the back.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Web_Api_Key_Load';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Key_Load
 */
class Request {
    static namespace = NS;
    /**
     * The backend ID for the related front.
     * @type {number}
     */
    frontRef;
}

/**
 * @memberOf TeqFw_Web_Push_Shared_Web_Api_Key_Load
 */
class Response {
    static namespace = NS;
    /** @type {string} */
    key;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class TeqFw_Web_Push_Shared_Web_Api_Key_Load {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast.castInt|function} castInt
     * @param {TeqFw_Core_Shared_Util_Cast.castString|function} castString
     */
    constructor(
        {
            'TeqFw_Core_Shared_Util_Cast.castInt': castInt,
            'TeqFw_Core_Shared_Util_Cast.castString': castString,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Request} [data]
         * @return {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.frontRef = castInt(data?.frontRef);
            return res;
        };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Response} [data]
         * @returns {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.key = castString(data?.key);
            return res;
        };
    }

}
