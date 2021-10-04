/**
 * Save user's Web Push subscription data.
 *
 * @namespace TeqFw_Web_Push_Back_Service_Subscript_Save
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Service_Subscript_Save';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class TeqFw_Web_Push_Back_Service_Subscript_Save {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Push_Shared_Service_Route_Subscript_Save.Factory} */
        const route = spec['TeqFw_Web_Push_Shared_Service_Route_Subscript_Save#Factory$'];
        /** @type {TeqFw_Db_Back_Api_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_Api_RDb_IConnect$'];
        /** @type {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} */
        const actAdd = spec['TeqFw_Web_Push_Back_Act_Subscript_Add$'];

        /** @type {typeof TeqFw_Web_Push_Back_Act_Subscript_Add.RESULT_CODE} */
        const CODE = actAdd.RESULT_CODE;

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Push_Shared_Service_Route_Subscript_Save.Request} */
                const req = context.getInData();
                /** @type {TeqFw_Web_Push_Shared_Service_Route_Subscript_Save.Response} */
                const res = context.getOutData();
                const shared = context.getHandlersShare();
                //
                /** @type {Fl32_Teq_User_Shared_Service_Dto_User} */
                const user = shared['@flancer32/teq_user/data'];
                if (user) {
                    const trx = await rdb.startTransaction();
                    try {
                        const opts = {
                            trx,
                            userId: user.id,
                            endpoint: req.endpoint,
                            auth: req.auth,
                            p256dh: req.p256dh,
                        };
                        const {code, subscriptId} = await actAdd(opts);
                        if (
                            (code === CODE.SUCCESS)
                            || (code === CODE.DUPLICATE)
                        ) {
                            res.subscriptId = subscriptId;
                        }
                        await trx.commit();
                    } catch (e) {
                        console.log(e);
                        await trx.rollback();
                        throw error;
                    }
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
