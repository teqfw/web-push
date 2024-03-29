/**
 * Get all subscriptions by front ID.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_GetByFrontId
 * @deprecated use CRUD readOne()
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_GetByFrontId';
/**
 * @param {TeqFw_Db_Back_RDb_Meta_IEntity|TeqFw_Web_Push_Back_RDb_Schema_Subscript} meta
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 */
export default function (
    {
        TeqFw_Web_Push_Back_RDb_Schema_Subscript$: meta,
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
    }
) {
    // VARS
    /** @type {typeof TeqFw_Web_Push_Back_RDb_Schema_Subscript.ATTR} */
    const ATTR = meta.getAttributes();

    // FUNCS
    /**
     * @param trx
     * @param {number} frontId
     * @return {Promise<{items: TeqFw_Web_Push_Back_RDb_Schema_Subscript[]}>}
     * @memberOf TeqFw_Web_Push_Back_Act_Subscript_GetByFrontId
     * @deprecated use CRUD readOne()
     */
    async function act({trx, frontId}) {
        const where = {[ATTR.FRONT_REF]: frontId};
        const items = await crud.readSet(trx, meta, where);
        return {items};
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
