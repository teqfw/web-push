/**
 * DTO for user's subscription to WebPush API.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Dto_Subscription';

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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Push_Shared_Dto_Subscription {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {TeqFw_Web_Push_Shared_Dto_Subscription_Keys} dtoKeys
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
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
            res.expirationTime = cast.date(data?.expirationTime);
            res.endpoint = cast.string(data?.endpoint);
            res.frontId = cast.int(data?.frontId);
            res.keys = dtoKeys.createDto(data?.keys);
            return res;
        }
    }

}
