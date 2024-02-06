/**
 * Create the WebPush subscription on the back.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class TeqFw_Web_Push_Back_Web_Api_Subscript_Create {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create} endpoint
     * @param {TeqFw_Db_Back_Util.dateUtc|function} dateUtc
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {TeqFw_Web_Push_Back_RDb_Schema_Subscript} rdbSubs
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Push_Shared_Web_Api_Subscript_Create$: endpoint,
            'TeqFw_Db_Back_Util.dateUtc': dateUtc,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            TeqFw_Web_Push_Back_RDb_Schema_Subscript$: rdbSubs,
        }
    ) {
        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Request|Object} req
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Create.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                const frontId = req.frontRef;
                const subs = req.subscription;
                // find existing subscription by frontRef
                /** @type {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto} */
                const found = await crud.readOne(trx, rdbSubs, frontId);
                // update or create new one
                if (found) {
                    found.date_expired = dateUtc(subs.expirationTime);
                    found.enabled = true;
                    found.endpoint = subs.endpoint;
                    found.key_auth = subs.keys.auth;
                    found.key_p256dh = subs.keys.p256dh;
                    await crud.updateOne(trx, rdbSubs, found);
                    res.success = true;
                } else {
                    const dto = rdbSubs.createDto();
                    if (subs?.expirationTime) dto.date_expired = dateUtc(subs.expirationTime);
                    dto.enabled = true;
                    dto.endpoint = subs.endpoint;
                    dto.front_ref = frontId;
                    dto.key_auth = subs.keys.auth;
                    dto.key_p256dh = subs.keys.p256dh;
                    await crud.create(trx, rdbSubs, dto);
                    res.success = true;
                }
                await trx.commit();
                logger.info(JSON.stringify(res));
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }

}
