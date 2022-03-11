/**
 * Process to remove Web Push subscription from RDB.
 */
export default class TeqFw_Web_Push_Back_Hand_Subscript_Remove {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript} */
        const rdbSubscript = spec['TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request} */
        const esfReq = spec['TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request$'];
        /** @type {TeqFw_Web_Back_Act_Front_GetIdByUuid.act|function} */
        const actGetFrontId = spec['TeqFw_Web_Back_Act_Front_GetIdByUuid$'];

        // MAIN
        eventsBack.subscribe(esfReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Remove_Request.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
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
