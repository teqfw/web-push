/**
 * DTO for user's subscription to Web Push API.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Dto_Subscription';

/**
 * @memberOf TeqFw_Web_Push_Shared_Dto_Subscription
 * @type {Object}
 */
const ATTR = {
    ENDPOINT: 'endpoint',
    EXPIRATION_TIME: 'expirationTime',
    FRONT_ID: 'frontId',
    KEYS: 'keys',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Dto_Subscription
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    expirationTime;
    /** @type {string} */
    endpoint;
    /** @type {number} */
    frontId;
    /** @type {TeqFw_Web_Push_Shared_Dto_Subscription_Keys.Dto} */
    keys;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_Web_Push_Shared_Dto_Subscription {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast.castDate|function} castDate
     * @param {TeqFw_Core_Shared_Util_Cast.castInt|function} castInt
     * @param {TeqFw_Core_Shared_Util_Cast.castString|function} castString
     * @param {TeqFw_Web_Push_Shared_Dto_Subscription_Keys} dtoKeys
     */
    constructor(
        {
            'TeqFw_Core_Shared_Util_Cast.castDate': castDate,
            'TeqFw_Core_Shared_Util_Cast.castInt': castInt,
            'TeqFw_Core_Shared_Util_Cast.castString': castString,
            TeqFw_Web_Push_Shared_Dto_Subscription_Keys$: dtoKeys,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} data
         * @return {TeqFw_Web_Push_Shared_Dto_Subscription.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.expirationTime = castDate(data?.expirationTime);
            res.endpoint = castString(data?.endpoint);
            res.frontId = castInt(data?.frontId);
            res.keys = dtoKeys.createDto(data?.keys);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
