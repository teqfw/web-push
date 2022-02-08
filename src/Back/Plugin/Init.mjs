/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];

    // DEFINE INNER FUNCTIONS
    async function action() {
        // TODO: just create processes
        // run initialization synchronously to prevent doubling of singletons
        await container.get('TeqFw_Web_Push_Back_Proc_Key_Load$');
        await container.get('TeqFw_Web_Push_Back_Proc_Subscript_Save$');

    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
