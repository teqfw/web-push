/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_Web_Push_Back_Defaults {

    CLI_PREFIX = 'web-push'; // prefix in CLI commands

    FILE_VAPID_KEYS = './cfg/local.vapid.key.json';

    /** @type {TeqFw_Web_Push_Shared_Defaults} */
    SHARED;

    /**
     *
     * @param {TeqFw_Web_Push_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Push_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
