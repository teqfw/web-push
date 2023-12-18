/**
 * Process to remove Web Push subscription from RDB.
 */
export default class TeqFw_Web_Push_Back_Hand_Subscript_Remove {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Db_Back_RDb_IConnect} rdb
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} rdbSubscript
     * @param {TeqFw_Web_Event_Back_Mod_Channel} eventsBack
     * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request} esfReq
     * @param {TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid.act|function} actGetFrontId
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: rdb,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$: rdbSubscript,
            TeqFw_Web_Event_Back_Mod_Channel$: eventsBack,
            TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request$: esfReq,
            TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid$: actGetFrontId,
        }
    ) {
        // MAIN
        eventsBack.subscribe(esfReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto} meta
         */
        async function onRequest({data, meta}) {
            const uuid = meta?.frontUUID;
            const trx = await rdb.startTransaction();
            try {
                // get frontId by UUID then delete subscription
                const {id: frontId} = await actGetFrontId({trx, uuid});
                if (frontId) {
                    await crud.deleteOne(trx, rdbSubscript, frontId);
                }
                await trx.commit();
            } catch (e) {
                logger.error(e.message);
                await trx.rollback();
                throw e;
            }
        }
    }
}
