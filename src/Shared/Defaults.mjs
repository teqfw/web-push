/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Web_Push_Shared_Defaults {

    NAME = '@teqfw/web-push'; // plugin's node in 'teqfw.json' & './cfg/local.json'

    /** @type {TeqFw_Web_Shared_Defaults} */
    MOD_WEB;

    /**
     * @param {TeqFw_Web_Shared_Defaults} MOD_WEB
     */
    constructor(
        {
            TeqFw_Web_Shared_Defaults$: MOD_WEB,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        Object.freeze(this);
    }
}
