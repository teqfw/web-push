/**
 * Process to save Web Push subscription to RDB.
 */
export default class TeqFw_Web_Push_Back_Hand_Subscript_Save {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Db_Back_RDb_IConnect} rdb
     * @param {TeqFw_Web_Event_Back_Mod_Channel} eventsBack
     * @param {TeqFw_Web_Event_Back_Mod_Portal_Front} portalFront
     * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request} esfReq
     * @param {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response} esbRes
     * @param {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} actAdd
     * @param {TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid.act|function} actGetFrontId
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: rdb,
            TeqFw_Web_Event_Back_Mod_Channel$: eventsBack,
            TeqFw_Web_Event_Back_Mod_Portal_Front$: portalFront,
            TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request$: esfReq,
            TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response$: esbRes,
            TeqFw_Web_Push_Back_Act_Subscript_Add$: actAdd,
            TeqFw_Web_Auth_Back_Act_Front_GetIdByUuid$: actGetFrontId,
        }
    ) {
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
