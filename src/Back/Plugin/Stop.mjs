/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Stop';

export default function Factory(spec) {
    // DEPS

    // COMPOSE RESULT
    async function action() { }

    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
