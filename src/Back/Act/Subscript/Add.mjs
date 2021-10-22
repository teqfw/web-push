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
const RESULT_CODE = {
    DUPLICATE: 'duplicate',
    SUCCESS: 'success',
}
Object.freeze(RESULT_CODE);

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Meta} */
    const metaSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript#Meta$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];

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
                [metaSubscript.ATTR.USER_REF]: userId,
                [metaSubscript.ATTR.KEY_AUTH]: auth
            };
            /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Dto} */
            const found = await crud.readOne(trx, metaSubscript, key);
            return found?.id ?? null;
        }

        // MAIN FUNCTIONALITY
        let code, subscriptId;
        subscriptId = await getSubscriptId(trx, userId, auth);
        if (subscriptId !== null) {
            code = RESULT_CODE.DUPLICATE;
        } else {
            const data = {
                [metaSubscript.ATTR.USER_REF]: userId,
                [metaSubscript.ATTR.ENDPOINT]: endpoint,
                [metaSubscript.ATTR.KEY_AUTH]: auth,
                [metaSubscript.ATTR.KEY_P256DH]: p256dh,
                [metaSubscript.ATTR.DATE_CREATED]: new Date(),
            };
            const pk = await crud.create(trx, metaSubscript, data);
            subscriptId = pk[metaSubscript.ATTR.ID];
            code = RESULT_CODE.SUCCESS;

        }
        return {code, subscriptId};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    act.RESULT_CODE = RESULT_CODE;
    return act;
}
