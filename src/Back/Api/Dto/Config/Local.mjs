/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Api_Dto_Config_Local';

// MODULE'S CLASSES
export default class TeqFw_Web_Push_Back_Api_Dto_Config_Local {
    /** @type {string} */
    email;
    /** @type {string} private key to use with subscription */
    keyPrivate;
    /** @type {string} public key to use with subscription */
    keyPublic;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Web_Push_Back_Api_Dto_Config_Local
 */
export class Factory {
    static namespace = NS;

    /**
     * @param {TeqFw_Core_Shared_Util_Cast.castString|function} castString
     */
    constructor(
        {
            ['TeqFw_Core_Shared_Util_Cast.castString']: castString,
        }
    ) {

        /**
         * @param {TeqFw_Web_Push_Back_Api_Dto_Config_Local|null} data
         * @return {TeqFw_Web_Push_Back_Api_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Web_Push_Back_Api_Dto_Config_Local();
            res.email = castString(data?.email);
            res.keyPrivate = castString(data?.keyPrivate);
            res.keyPublic = castString(data?.keyPublic);
            return res;
        }
    }
}
