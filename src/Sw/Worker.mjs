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
        // DEFINE WORKING VARS / PROPS


        // DEFINE INNER FUNCTIONS

        function onPush(event) {
            if (event.data) {
                const json = event.data.json();
                console.log('This push event has data: ', JSON.stringify(json));
                const opts = {
                    body: json.body,
                    icon: 'https://bwl.local.teqfw.com/push/img/favicon-192.png'
                };
                const promiseChain = self.registration.showNotification(json.title, opts);
                event.waitUntil(promiseChain);
            } else {
                console.log('This push event has no data.');
            }
        }

        // DEFINE INSTANCE METHODS

        /**
         * Bind event handlers to worker's scope.
         * @param {WorkerGlobalScope} context
         * @param {string} door entry point for the front of application
         */
        this.setup = function (context, door) {
            context.addEventListener('push', onPush);
            const name = this.constructor.name;
            console.log(`Setup is complete for '${name}'.`);
        }

        // MAIN FUNCTIONALITY
    }

}
