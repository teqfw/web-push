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
    /** @type {TeqFw_Db_Back_Api_Util.isPostgres|Function} */
    const isPostgres = spec['TeqFw_Db_Back_Api_Util#isPostgres'];
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const ESubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript#'];

    // DEFINE WORKING VARS / PROPS


    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param userId
     * @param endpoint
     * @param auth
     * @param p256dh
     * @return {Promise<{code: string, subscriptId: number}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_Add
     */
    async function act({trx, userId, endpoint, auth, p256dh}) {
        // DEFINE INNER FUNCTIONS
        /**
         * Get ID for current subscription by userId and auth key.
         *
         * @param trx
         * @param {number} userId
         * @param {string} auth
         * @return {Promise<number|null>}
         */
        async function getSubscriptId(trx, userId, auth) {
            let res = null;
            const query = trx.from(ESubscript.ENTITY);
            query.select();
            query.where(ESubscript.A_USER_REF, userId);
            query.where(ESubscript.A_KEY_AUTH, auth);
            /** @type {Array} */
            const rs = await query;
            if (rs.length === 1) {
                const [first] = rs;
                res = first[ESubscript.A_ID];
            }
            return res;
        }

        async function add(trx, record) {
            const isPg = isPostgres(trx.client);
            const query = trx(ESubscript.ENTITY).insert(record);
            if (isPg) query.returning(ESubscript.A_ID);
            const rs = await query;
            const [first] = rs;
            return first;
        }

        // MAIN FUNCTIONALITY
        let code, subscriptId;
        subscriptId = await getSubscriptId(trx, userId, auth);
        if (subscriptId !== null) {
            code = RESULT_CODE.DUPLICATE;
        } else {
            subscriptId = await add(trx, {
                [ESubscript.A_USER_REF]: userId,
                [ESubscript.A_ENDPOINT]: endpoint,
                [ESubscript.A_KEY_AUTH]: auth,
                [ESubscript.A_KEY_P256DH]: p256dh,
                [ESubscript.A_DATE_CREATED]: new Date(),
            });
            code = RESULT_CODE.SUCCESS;

        }
        return {code, subscriptId};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    act.RESULT_CODE = RESULT_CODE;
    return act;
}
