/**
 * Load WebPush subscription keys from the back.
 */
import assert from 'assert';
import {config as cfgTest, container} from '@teqfw/test';
import {describe, it} from 'mocha';

// SETUP ENV

/** @type {TeqFw_Core_Back_Config} */
const config = await container.get('TeqFw_Core_Back_Config$');
config.init(cfgTest.pathToRoot, 'test');

// GET OBJECT FROM CONTAINER AND RUN TESTS
/** @type {TeqFw_Web_Push_Back_Web_Api_Key_Load} */
const handler = await container.get('TeqFw_Web_Push_Back_Web_Api_Key_Load$');
/** @type {TeqFw_Web_Push_Shared_Web_Api_Key_Load} */
const dtoEnd = await container.get('TeqFw_Web_Push_Shared_Web_Api_Key_Load$');
/** @type {typeof TeqFw_Web_Api_Back_Api_Service_Context} */
const Context = await container.get('TeqFw_Web_Api_Back_Api_Service_Context#');

describe('TeqFw_Web_Push_Back_Web_Api_Key_Load', function () {
    it('can be instantiated', async () => {
        assert(typeof handler === 'object');
    });

    it('has right endpoint', async () => {
        const endpoint = handler.getEndpoint();
        assert(endpoint.constructor.name === 'TeqFw_Web_Push_Shared_Web_Api_Key_Load');
    });
    it('can process requests', async () => {
        const req = dtoEnd.createReq();
        const res = dtoEnd.createRes();
        const context = new Context();
        await handler.process(req, res, context);
        assert(typeof res?.key === 'string');
    });
});

