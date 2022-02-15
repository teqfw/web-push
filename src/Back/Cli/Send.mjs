/**
 * Send push notification to the user.
 *
 * @namespace TeqFw_Web_Push_Back_Cli_Send
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'TeqFw_Web_Push_Back_Cli_Send';
const OPT_BODY = 'body';
const OPT_TITLE = 'title';
const OPT_USER = 'user';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Web_Push_Back_Cli_Send
 */
export default function Factory(spec) {
    // DEPS
    /** @type {TeqFw_Web_Push_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const connector = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} */
    const fOpt = spec['TeqFw_Core_Back_Api_Dto_Command_Option#Factory$'];
    /** @type {TeqFw_Web_Push_Back_Act_Subscript_GetByUserId|Function} */
    const actGetByUser = spec['TeqFw_Web_Push_Back_Act_Subscript_GetByUserId$'];
    /** @type {TeqFw_Web_Push_Back_Act_Subscript_SendMsg|Function} */
    const actSendMsg = spec['TeqFw_Web_Push_Back_Act_Subscript_SendMsg$'];

    // ENCLOSED FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Web_Push_Back_Cli_Send
     */
    async function action(opts) {
        const body = opts[OPT_BODY];
        const title = opts[OPT_TITLE];
        const userId = opts[OPT_USER];
        // logger.reset();
        // logger.pause(false);
        logger.info(`Push message "${body}" to user #${userId}.`);
        const trx = await connector.startTransaction();
        try {
            /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript[]} */
            const {items} = await actGetByUser({trx, userId});
            for (const item of items) {
                const endpoint = item.endpoint;
                const auth = item.key_auth;
                const p256dh = item.key_p256dh;
                const res = await actSendMsg({title, body, endpoint, auth, p256dh});
                logger.info(JSON.stringify(res));
            }
            trx.commit();
        } catch (e) {
            trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await connector.disconnect();
    }

    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'send';
    res.desc = 'Send push notification to the user.';
    res.action = action;
    // add option --user
    const optUser = fOpt.create();
    optUser.flags = `-u, --${OPT_USER} <user_id>`;
    optUser.description = `User ID for recipient of the message`;
    res.opts.push(optUser);
    // add option --body
    const optTitle = fOpt.create();
    optTitle.flags = `-t, --${OPT_TITLE} <title>`;
    optTitle.description = `Message title.`;
    res.opts.push(optTitle);
    // add option --body
    const optBody = fOpt.create();
    optBody.flags = `-b, --${OPT_BODY} <body>`;
    optBody.description = `Message body.`;
    res.opts.push(optBody);
    return res;
}
