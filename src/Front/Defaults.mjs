/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_Web_Push_Front_Defaults {

    /** @type {TeqFw_Web_Push_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Push_Shared_Defaults} */
        this.SHARED = spec['TeqFw_Web_Push_Shared_Defaults$'];

        // MAIN
        Object.freeze(this);
    }
}
