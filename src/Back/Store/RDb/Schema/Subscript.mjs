/**
 *  Meta data for '/web/push/subscription' entity.
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
    ENDPOINT: 'endpoint',
    ID: 'id',
    KEY_AUTH: 'key_auth',
    KEY_P256DH: 'key_p256dh',
    USER_REF: 'user_ref',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 */
class Dto {
    static namespace = `${NS}.Dto`;
    date_created;
    endpoint;
    id;
    key_auth;
    key_p256dh;
    user_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript {
    constructor(spec) {
        /** @type {TeqFw_Web_Push_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}


// finalize code components for this es6-module
Object.freeze(ATTR);
