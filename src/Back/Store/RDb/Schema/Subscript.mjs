/**
 *  Metadata for '/web/push/subscription' entity.
 *  @namespace TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/web/push/subscript';

/**
 * @memberOf TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    ENABLED: 'enabled',
    ENDPOINT: 'endpoint',
    FRONT_REF: 'front_ref',
    KEY_AUTH: 'key_auth',
    KEY_P256DH: 'key_p256dh',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 */
class Dto {
    static namespace = NS;
    date_created;
    enabled;
    endpoint;
    front_ref;
    key_auth;
    key_p256dh;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript {
    /**
     * @param {TeqFw_Web_Push_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     */
    constructor(
        {
            TeqFw_Web_Push_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
        }
    ) {
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
