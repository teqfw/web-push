/**
 * Create new server keys for Web Push API.
 *
 * @namespace TeqFw_Web_Push_Back_Cli_Key_Create
 */
// MODULE'S IMPORT
import webPush from 'web-push';
import {join} from 'path';
import {existsSync, writeFileSync} from 'fs';

// DEFINE WORKING VARS
const NS = 'TeqFw_Web_Push_Back_Cli_Key_Create';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Web_Push_Back_Cli_Key_Create
 */
export default function Factory(spec) {
    // DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];


    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Web_Push_Back_Cli_Key_Create
     */
    async function action() {
        // FUNCS
        async function keyExists(path) {
            if (existsSync(path)) {
                logger.error(`There is VAPID keys for the application in '${path}'`);
                return true;
            }
            return false;
        }

        // MAIN
        logger.reset(false);
        try {
            const root = config.getBoot().projectRoot;
            const path = join(root, DEF.FILE_VAPID_KEYS);
            if (!(await keyExists(path))) {
                const vapidKeys = webPush.generateVAPIDKeys();
                const data = JSON.stringify(vapidKeys);
                writeFileSync(path, data);
                logger.info(`New VAPID keys are stored in '${path}'`);
            }
        } catch (error) {
            logger.error(error);
        }
    }

    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'key-create';
    res.desc = 'Create new server keys for Web Push API.';
    res.action = action;
    return res;
}
