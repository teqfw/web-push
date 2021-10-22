/**
 *  Meta data for '/web/push/subscription' entity (users registry).
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
const ATTRIBUTES = Object.values(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 */
class Dto {
    date_created;
    endpoint;
    id;
    key_auth;
    key_p256dh;
    user_ref;
}

/**
 * @memberOf TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
class Meta {
    constructor(spec) {
        /** @type {TeqFw_Web_Push_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];

        this.createDto = (data) => {
            const res = new Dto();
            for (const attr of Object.keys(data))
                if (ATTRIBUTES.includes(attr)) res[attr] = data[attr];
            return res;
        }

        this.getEntityName = () => `${DEF.SHARED.NAME}${ENTITY}`;

        this.getAttributes = () => Object.values(ATTR);

        this.getPrimaryKey = () => [ATTR.ID];

        this.ATTR = ATTR;
    }
}


// finalize code components for this es6-module
Object.defineProperty(Dto, 'name', {value: `${NS}.${Dto.name}`});
Object.freeze(ATTR);
export {Dto, Meta};
