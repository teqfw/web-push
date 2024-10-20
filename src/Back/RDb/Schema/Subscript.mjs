/**
 *  The subscriptions with keys to send notifications using WebPush API.
 *  @namespace TeqFw_Web_Push_Back_RDb_Schema_Subscript
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_RDb_Schema_Subscript';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/web/push/subscript';

/**
 * @memberOf TeqFw_Web_Push_Back_RDb_Schema_Subscript
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    DATE_EXPIRED: 'date_expired',
    ENABLED: 'enabled',
    ENDPOINT: 'endpoint',
    FRONT_REF: 'front_ref',
    KEY_AUTH: 'key_auth',
    KEY_P256DH: 'key_p256dh',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Back_RDb_Schema_Subscript
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    date_created;
    /** @type {Date} */
    date_expired;
    /** @type {boolean} */
    enabled;
    /** @type {string} */
    endpoint;
    /** @type {number} */
    front_ref;
    /** @type {string} */
    key_auth;
    /** @type {string} */
    key_p256dh;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class TeqFw_Web_Push_Back_RDb_Schema_Subscript {
    /**
     * @param {TeqFw_Web_Push_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast.castBoolean|function} castBoolean
     * @param {TeqFw_Core_Shared_Util_Cast.castDate|function} castDate
     * @param {TeqFw_Core_Shared_Util_Cast.castInt|function} castInt
     * @param {TeqFw_Core_Shared_Util_Cast.castString|function} castString
     */
    constructor(
        {
            TeqFw_Web_Push_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            'TeqFw_Core_Shared_Util_Cast.castBoolean': castBoolean,
            'TeqFw_Core_Shared_Util_Cast.castDate': castDate,
            'TeqFw_Core_Shared_Util_Cast.castInt': castInt,
            'TeqFw_Core_Shared_Util_Cast.castString': castString,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto} [data]
         * @return {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = castDate(data?.date_created);
            res.date_expired = castDate(data?.date_expired);
            res.enabled = castBoolean(data?.enabled);
            res.endpoint = castString(data?.endpoint);
            res.front_ref = castInt(data?.front_ref);
            res.key_auth = castString(data?.key_auth);
            res.key_p256dh = castString(data?.key_p256dh);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof TeqFw_Web_Push_Back_RDb_Schema_Subscript.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.FRONT_REF],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
