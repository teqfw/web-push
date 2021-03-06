/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Web_Push_Shared_Defaults {

    NAME = '@teqfw/web-push'; // plugin's node in 'teqfw.json' & './cfg/local.json'

    WEB_LOAD_SERVER_KEY = '/load/server_key';
    WEB_SUBSCRIPTION_SAVE = '/subscription/save';

    /** @type {TeqFw_Web_Shared_Defaults} */
    MOD_WEB;

    constructor(spec) {
        this.MOD_WEB = spec['TeqFw_Web_Shared_Defaults$'];
        Object.freeze(this);
    }
}
