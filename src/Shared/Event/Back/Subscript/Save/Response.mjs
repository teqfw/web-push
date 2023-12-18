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
    /**
     * @param {TeqFw_Web_Event_Shared_Dto_Event} dtoBase
     * @param {TeqFw_Core_Shared_Util_Cast.castInt|function} castInt
     */
    constructor(
        {
            TeqFw_Web_Event_Shared_Dto_Event$: dtoBase,
            'TeqFw_Core_Shared_Util_Cast.castInt': castInt,
        }
    ) {
        // VARS
        // const ATTR = dtoBase.getAttributes();

        // FUNCS
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
         * @param {{data: TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto, meta: TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto}} [data]
         * @return {{data: TeqFw_Web_Push_Shared_Event_Back_Subscript_Save_Response.Dto, meta: TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto}}
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
