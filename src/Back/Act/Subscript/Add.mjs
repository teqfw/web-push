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
    DUPLICATE: 'duplicate', // TODO: remove if unused
    SUCCESS: 'success',
}
Object.freeze(RESULT);
/**
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 * @param {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} rdbSubscript
 */
export default function (
    {
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
        TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$: rdbSubscript,
    }
) {
    // VARS
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.ATTR} */
    const ATTR = rdbSubscript.getAttributes();


    // FUNCS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} frontId
     * @param {string} endpoint
     * @param {string} auth
     * @param {string} p256dh
     * @param {boolean} enabled
     * @return {Promise<{code: string}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_Add
     */
    async function act({trx, frontId, endpoint, auth, p256dh, enabled}) {
        let code;

        const data = {
            [ATTR.DATE_CREATED]: new Date(),
            [ATTR.ENABLED]: enabled ?? true,
            [ATTR.ENDPOINT]: endpoint,
            [ATTR.FRONT_REF]: frontId,
            [ATTR.KEY_AUTH]: auth,
            [ATTR.KEY_P256DH]: p256dh,
        };

        const found = await crud.readOne(trx, rdbSubscript, frontId);

        if (found !== null) {
            await crud.updateOne(trx, rdbSubscript, data);
            code = RESULT.SUCCESS;
        } else {
            await crud.create(trx, rdbSubscript, data);
            code = RESULT.SUCCESS;

        }
        return {code};
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    act.RESULT = RESULT;
    return act;
}

export {
    RESULT
}
