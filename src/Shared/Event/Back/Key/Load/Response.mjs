/**
 * Back response with Web Push subscription keys.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    key;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response.Dto} [data]
         * @return {TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.key = castString(data?.key);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_Web_Push_Shared_Event_Back_Key_Load_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
