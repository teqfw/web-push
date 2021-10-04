/**
 *  'web_push_subscription' entity.
 */
export default class TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript {
    date_created;
    endpoint;
    id;
    key_auth;
    key_p256dh;
    user_ref;
}

// table name and columns names (entity and attributes) to use in queries to RDb
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_DATE_CREATED = 'date_created';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_ENDPOINT = 'endpoint';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_ID = 'id';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_KEY_AUTH = 'key_auth';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_KEY_P256DH = 'key_p256dh';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.A_USER_REF = 'user_ref';
TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.ENTITY = 'web_push_subscript';

// freeze class to deny attributes changes
Object.freeze(TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript);
