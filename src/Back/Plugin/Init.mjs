/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Push_Back_Plugin_Init';

/**
 *
 * @param {TeqFw_Di_Api_Container} container
 * @return {(function(): Promise<void>)|*}
 * @constructor
 */
export default function Factory(
    {
        container,
    }
) {
    // FUNCS
    async function action() {
        // TODO: just create processes
        // run initialization synchronously to prevent doubling of singletons
        // await container.get('TeqFw_Web_Push_Back_Hand_Key_Load$');
        // await container.get('TeqFw_Web_Push_Back_Hand_Subscript_Remove$');
        // await container.get('TeqFw_Web_Push_Back_Hand_Subscript_Save$');

    }

    // MAIN
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
