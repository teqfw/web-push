/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_Web_Push_Back_Defaults {

    CLI_PREFIX = 'web-push'; // prefix in CLI commands

    FILE_VAPID_KEYS = './cfg/local.vapid.key.json';

    /** @type {TeqFw_Web_Push_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // DEPS
        this.SHARED = spec['TeqFw_Web_Push_Shared_Defaults$'];

        // MAIN
        Object.freeze(this);
    }
}
