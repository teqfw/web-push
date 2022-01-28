/**
 * Main script to use service worker in TeqFW applications.
 *
 * This is standard ES6 module w/o TeqFW DI support (service workers don't allow dynamic `import()`).
 *
 * I suppose that SW files should be cached by browser itself, so these files are not under `./Front/` folder.
 */
export default class TeqFw_Web_Push_Sw_Worker {

    /**
     * ATTN: This is standard ES6 module w/o TeqFW DI support !!!
     */
    constructor() {
        // ENCLOSED VARS
        /** @type {function} */
        let _log;

        // ENCLOSED FUNCTIONS

        function onPush(event) {
            if (event.data) {
                const json = event.data.json();
                _log('[TeqFw_Web_Push_Sw_Worker]: This push event has data: ', JSON.stringify(json));
                const opts = {
                    body: json.body,
                    icon: './img/favicon-192.png'
                };
                const promiseChain = self.registration.showNotification(json.title, opts);
                event.waitUntil(promiseChain);
            } else {
                _log('[TeqFw_Web_Push_Sw_Worker]: This push event has no data.');
            }
        }

        // INSTANCE METHODS

        /**
         * Bind event handlers to worker's scope.
         * @param {WorkerGlobalScope} context
         * @param {string} door entry point for the front of application
         */
        this.setup = function (context, door) {
            _log = context.logToServer; // pin remote log function to current module
            context.addEventListener('push', onPush); // Safari browser has no 'push' event
            const name = this.constructor.name;
            _log(`[TeqFw_Web_Push_Sw_Worker]: Setup is complete for '${name}'.`);
        }
    }

}
