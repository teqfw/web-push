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

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Web_Push_Shared_Dto_Subscription_Keys} */
        const dtoKeys = spec['TeqFw_Web_Push_Shared_Dto_Subscription_Keys$'];

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
