/**
 * Add new subscription to RDB.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_Add
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_Add';

/**
 * @memberOf TeqFw_Web_Push_Back_Act_Subscript_Add
 */
const RESULT = {
    DUPLICATE: 'duplicate',
    SUCCESS: 'success',
}
Object.freeze(RESULT);

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_RDb_Meta_IEntity|TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const meta = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.ATTR} */
    const ATTR = meta.getAttributes();


    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} userId
     * @param {string} endpoint
     * @param {string} auth
     * @param {string} p256dh
     * @return {Promise<{code: string, subscriptId: number}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_Add
     */
    async function act({trx, userId, endpoint, auth, p256dh}) {
        // DEFINE INNER FUNCTIONS
        /**
         * Get ID for current subscription by userId and auth key.
         *
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} userId
         * @param {string} auth
         * @return {Promise<number|null>}
         */
        async function getSubscriptId(trx, userId, auth) {
            const key = {
                [ATTR.USER_REF]: userId,
                [ATTR.KEY_AUTH]: auth
            };
            /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Dto} */
            const found = await crud.readOne(trx, meta, key);
            return found?.id ?? null;
        }

        // MAIN FUNCTIONALITY
        let code, subscriptId;
        subscriptId = await getSubscriptId(trx, userId, auth);
        if (subscriptId !== null) {
            code = RESULT.DUPLICATE;
        } else {
            const data = {
                [ATTR.USER_REF]: userId,
                [ATTR.ENDPOINT]: endpoint,
                [ATTR.KEY_AUTH]: auth,
                [ATTR.KEY_P256DH]: p256dh,
                [ATTR.DATE_CREATED]: new Date(),
            };
            const pk = await crud.create(trx, meta, data);
            subscriptId = pk[ATTR.ID];
            code = RESULT.SUCCESS;

        }
        return {code, subscriptId};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    act.RESULT = RESULT;
    return act;
}

export {
    RESULT
}
