/**
 * Get all subscriptions by user ID.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_GetByUserId
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_GetByUserId';

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Meta} */
    const meta = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript#Meta$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];

    // DEFINE INNER FUNCTIONS
    /**
     * @param trx
     * @param {number} userId
     * @return {Promise<{items: TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript[]}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_GetByUserId
     */
    async function act({trx, userId}) {
        // DEFINE INNER FUNCTIONS

        // MAIN FUNCTIONALITY
        const where = {[meta.ATTR.USER_REF]: userId};
        const items = await crud.readSet(trx, meta, where);
        return {items};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    return act;
}
