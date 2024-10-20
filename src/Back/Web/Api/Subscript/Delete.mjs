/**
 * Delete the WebPush subscription on the back.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class TeqFw_Web_Push_Back_Web_Api_Subscript_Delete {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {TeqFw_Web_Push_Back_RDb_Schema_Subscript} rdbSubs
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            TeqFw_Web_Push_Back_RDb_Schema_Subscript$: rdbSubs,
        }
    ) {
        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Request|Object} req
         * @param {TeqFw_Web_Push_Shared_Web_Api_Subscript_Delete.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const trx = await conn.startTransaction();
            try {
                const frontId = req.frontRef;
                // find existing subscription by frontRef
                /** @type {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto} */
                const found = await crud.readOne(trx, rdbSubs, frontId);
                // update or create new one
                if (found) await crud.deleteOne(trx, rdbSubs, found);
                await trx.commit();
                res.success = true;
                logger.info(JSON.stringify(res));
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }

}
