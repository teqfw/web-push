/**
 * Process to save Web Push subscription to RDB.
 */
export default class TeqFw_Web_Push_Back_Hand_Subscript_Save {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Core_Back_Mod_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_Mod_Event_Bus$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request} */
        const esfReq = spec['TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request$'];
        /** @type {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response} */
        const esbRes = spec['TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response$'];
        /** @type {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} */
        const actAdd = spec['TeqFw_Web_Push_Back_Act_Subscript_Add$'];
        /** @type {TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid.act|function} */
        const actGetFrontId = spec['TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid$'];

        // MAIN
        eventsBack.subscribe(esfReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto} meta
         */
        async function onRequest({data, meta}) {
            const subscript = data?.subscription;
            const uuid = meta?.frontUUID;
            const trx = await rdb.startTransaction();
            try {
                // get frontId by UUID
                const {id: frontId} = await actGetFrontId({trx, uuid});
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
