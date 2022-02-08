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

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_RDb_Meta_IEntity|TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const rdbSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];

    // DEFINE WORKING VARS / PROPS
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.ATTR} */
    const ATTR = rdbSubscript.getAttributes();


    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {number} frontId
     * @param {string} endpoint
     * @param {string} auth
     * @param {string} p256dh
     * @return {Promise<{code: string}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_Add
     */
    async function act({trx, frontId, endpoint, auth, p256dh}) {
        let code;

        const data = {
            [ATTR.FRONT_REF]: frontId,
            [ATTR.ENDPOINT]: endpoint,
            [ATTR.KEY_AUTH]: auth,
            [ATTR.KEY_P256DH]: p256dh,
            [ATTR.DATE_CREATED]: new Date(),
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

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    act.RESULT = RESULT;
    return act;
}

export {
    RESULT
}
