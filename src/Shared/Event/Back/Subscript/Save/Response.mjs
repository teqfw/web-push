/**
 * Back response with frontId for which this subscription belongs.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    frontId;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto} [data]
         * @return {TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.frontId = castInt(data?.frontId);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
