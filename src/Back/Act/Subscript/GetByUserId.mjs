/**
 * Get all subscriptions by user ID.
 *
 * @namespace TeqFw_Web_Push_Back_Act_Subscript_GetByUserId
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Act_Subscript_GetByUserId';

export default function (spec) {
    // EXTRACT DEPS
    /** @type {typeof TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
    const ESubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript#'];

    // DEFINE WORKING VARS / PROPS


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
        const items = [];
        const query = trx.from(ESubscript.ENTITY);
        query.select();
        query.where(ESubscript.A_USER_REF, userId);
        const rs = await query;
        for (const one of rs) {
            const item = Object.assign(new ESubscript(), one);
            items.push(item);
        }
        return {items};
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(act, 'name', {value: `${NS}.${act.name}`});
    return act;
}
