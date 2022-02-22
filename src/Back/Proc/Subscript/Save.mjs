/**
 * Process to save Web Push subscription to RDB.
 */
export default class TeqFw_Web_Push_Back_Proc_Subscript_Save {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_Web_Back_Store_RDb_Schema_Front} */
        const rdbFront = spec['TeqFw_Web_Back_Store_RDb_Schema_Front$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request} */
        const esfReq = spec['TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response} */
        const esbRes = spec['TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response$'];
        /** @type {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} */
        const actAdd = spec['TeqFw_Web_Push_Back_Act_Subscript_Add$'];

        // VARS
        /** @type {typeof TeqFw_Web_Back_Store_RDb_Schema_Front.ATTR} */
        const A_FRONT = rdbFront.getAttributes();

        // MAIN
        eventsBack.subscribe(esfReq.getEventName(), handler)

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         */
        async function handler({data, meta}) {
            const subscript = data?.subscription;
            const frontUUID = meta?.frontUUID;
            const trx = await rdb.startTransaction();
            try {
                // get frontId by UUID
                // TODO: use TeqFw_Web_Back_Act_Front_GetIdByUuid
                /** @type {TeqFw_Web_Back_Store_RDb_Schema_Front.Dto} */
                const found = await crud.readOne(trx, rdbFront, {[A_FRONT.UUID]: frontUUID});
                const frontId = found ? found.id : null;
                if (frontId) {
                    const opts = {
                        trx,
                        frontId,
                        endpoint: subscript.endpoint,
                        auth: subscript.keys.auth,
                        p256dh: subscript.keys.p256dh,
                    };
                    await actAdd(opts);
                    // publish response
                    const event = esbRes.createDto();
                    event.data.frontId = frontId;
                    event.meta.frontUUID = meta.frontUUID;
                    portalFront.publish(event);
                } // do nothing
                await trx.commit();
            } catch (e) {
                logger.error(e.message);
                await trx.rollback();
                throw e;
            }
        }
    }
}
