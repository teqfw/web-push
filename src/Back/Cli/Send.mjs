/**
 * Send push notification to the user.
 *
 * @namespace TeqFw_Web_Push_Back_Cli_Send
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'TeqFw_Web_Push_Back_Cli_Send';
const OPT_BODY = 'body';
const OPT_FRONT = 'front';
const OPT_TITLE = 'title';

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
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} */
    const fOpt = spec['TeqFw_Core_Back_Api_Dto_Command_Option#Factory$'];
    /** @type {TeqFw_Web_Push_Back_Act_Subscript_SendMsg.act|function} */
    const actSendMsg = spec['TeqFw_Web_Push_Back_Act_Subscript_SendMsg$'];

    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Web_Push_Back_Cli_Send
     */
    async function action(opts) {
        const body = opts[OPT_BODY];
        const frontId = opts[OPT_FRONT];
        const title = opts[OPT_TITLE];
        logger.info(`Push message "${body}" to front #${frontId}.`);
        const trx = await rdb.startTransaction();
        try {
            const res = await actSendMsg({trx, title, body, frontId});
            if (res) logger.info(JSON.stringify(res));
            else logger.info(`Web Push is failed.`);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
            logger.error(`${e.toString()}`);
        }
        await rdb.disconnect();
    }

    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'send';
    res.desc = 'Send push notification to the user.';
    res.action = action;
    // add option --user
    const optUser = fOpt.create();
    optUser.flags = `-f, --${OPT_FRONT} <front_id>`;
    optUser.description = `Front ID for recipient of the message`;
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
