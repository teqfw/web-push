/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Dto_Config_Local';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Push_Back_Plugin_Dto_Config_Local
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    email;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Push_Back_Plugin_Dto_Config_Local {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {

        /**
         * @param {TeqFw_Web_Push_Back_Plugin_Dto_Config_Local.Dto} data
         * @return {TeqFw_Web_Push_Back_Plugin_Dto_Config_Local.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.email = cast.string(data?.email);
            return res;
        };
    }
}