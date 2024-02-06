/**
 * DTO for user's subscription keys (WebPush API).
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Dto_Subscription_Keys';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Dto_Subscription_Keys
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    auth;
    /** @type {string} */
    p256dh;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Push_Shared_Dto_Subscription_Keys {
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
         * @param {TeqFw_Web_Push_Shared_Dto_Subscription_Keys.Dto} data
         * @return {TeqFw_Web_Push_Shared_Dto_Subscription_Keys.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.auth = cast.string(data?.auth);
            res.p256dh = cast.string(data?.p256dh);
            return res;
        }
    }

}