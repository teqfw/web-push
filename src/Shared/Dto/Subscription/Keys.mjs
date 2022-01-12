/**
 * DTO for user's subscription keys (Web Push API).
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Dto_Subscription_Keys';

/**
 * @memberOf TeqFw_Web_Push_Shared_Dto_Subscription_Keys
 * @type {Object}
 */
const ATTR = {
    AUTH: 'auth',
    P256DH: 'p256dh',
};

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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_Web_Push_Shared_Dto_Subscription_Keys {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Push_Shared_Dto_Subscription_Keys.Dto} data
         * @return {TeqFw_Web_Push_Shared_Dto_Subscription_Keys.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.auth = castString(data?.auth);
            res.p256dh = castString(data?.p256dh);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
