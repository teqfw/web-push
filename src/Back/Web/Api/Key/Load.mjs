/**
 * Load WebPush subscription keys from the back.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class TeqFw_Web_Push_Back_Web_Api_Key_Load {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load} endpoint
     * @param {TeqFw_Web_Push_Back_Act_Subscript_LoadKeys.act|function} actLoad
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Push_Shared_Web_Api_Key_Load$: endpoint,
            TeqFw_Web_Push_Back_Act_Subscript_LoadKeys$: actLoad,
        }
    ) {
        // VARS
        /**
         * Public key of the VAPID keys pair.
         * @type {string}
         */
        let _cache;

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Request|Object} req
         * @param {TeqFw_Web_Push_Shared_Web_Api_Key_Load.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            // get from process cache or load keys from file
            if (!_cache) {
                /** @type {{publicKey: string, privateKey: string}} */
                const keys = actLoad();
                _cache = keys?.publicKey;
                logger.info(`Public key for Web Push subscription is cached by API requests handler.`);
            }
            res.key = _cache;
        };
    }


}
