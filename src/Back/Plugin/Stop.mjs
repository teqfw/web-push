/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Stop';

export default function Factory() {
    // DEPS

    // COMPOSE RESULT
    async function action() { }

    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
