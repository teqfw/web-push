/**
 * Front request to get Web Push subscription keys from server.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request
 */
class Dto {
    static namespace = NS;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request.Dto} [data]
         * @return {TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request.Dto}
         */
        function createData(data) {
            const res = new Dto();
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_Web_Push_Shared_Event_Front_Key_Load_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
         */
        this.createDto = function (data) {
            const res = dtoBase.createDto({[ATTR.META]: data?.[ATTR.META]});
            res.meta.name = NS;
            res.data = createData(data?.[ATTR.DATA]);
            // noinspection JSValidateTypes
            return res;
        }

        this.getEventName = () => NS;
    }
}
