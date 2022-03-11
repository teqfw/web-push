/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Init';

export default function Factory(spec) {
    // DEPS
  /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];

    // FUNCS
    async function action() {
        // TODO: just create processes
        // run initialization synchronously to prevent doubling of singletons
        await container.get('TeqFw_Web_Push_Back_Hand_Key_Load$');
        await container.get('TeqFw_Web_Push_Back_Hand_Subscript_Remove$');
        await container.get('TeqFw_Web_Push_Back_Hand_Subscript_Save$');

    }

    // MAIN
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
