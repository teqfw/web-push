/**
 * Front request to save Web Push subscription data to server.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request
 */
class Dto {
    static namespace = NS;
    /** @type {TeqFw_Web_Push_Shared_Dto_Subscription.Dto} */
    subscription;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Web_Push_Shared_Dto_Subscription} */
        const dtoSubscript = spec['TeqFw_Web_Push_Shared_Dto_Subscription$'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto} [data]
         * @return {TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.subscription = dtoSubscript.createDto(data?.subscription);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_Web_Push_Shared_Event_Front_Subscript_Save_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
