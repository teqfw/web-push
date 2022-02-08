/**
 * Add/get subscriptions using actions.
 */
import assert from 'assert';
import {container, config, dbConnect} from '@teqfw/test';
import {describe, it} from 'mocha';
import {loadRoot} from '../../lib/util.mjs';


// get runtime objects from DI
/** @type {TeqFw_Db_Back_RDb_Schema} */
const schema = await container.get('TeqFw_Db_Back_RDb_Schema$');
/** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
const crud = await container.get('TeqFw_Db_Back_Api_RDb_ICrudEngine$');
/** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
const meta = await container.get('TeqFw_User_Back_Store_RDb_Schema_User$');

/** @type {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} */
const actAdd = await container.get('TeqFw_Web_Push_Back_Act_Subscript_Add$');
/** @type {TeqFw_Web_Push_Back_Act_Subscript_GetByUserId.act|Function} */
const actGet = await container.get('TeqFw_Web_Push_Back_Act_Subscript_GetByUserId$');

// prepare this unit runtime objects
/** @type {typeof TeqFw_User_Back_Store_RDb_Schema_User.ATTR} */
const ATTR = meta.getAttributes();
const USER1_ID = 1;
const path = config.pathToRoot;
const {dem, cfg} = await loadRoot(container, path);
describe('Act_Subscript', function () {

    it('reset DB schema and data', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        schema.setDem({dem});
        schema.setCfg({cfg});
        // reset schema
        await schema.dropAllTables({conn});
        await schema.createAllTables({conn});
        // add data
        const user1 = {};
        const trx = await conn.startTransaction();
        const key = await crud.create(trx, meta, user1);
        assert(key[ATTR.ID] === USER1_ID);
        await trx.commit();
        await conn.disconnect();
    });


    it('can add subscription', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        const trx = await conn.startTransaction();
        try {
            const userId = USER1_ID;
            const endpoint = 'endpoint';
            const auth = 'auth';
            const p256dh = 'p256dh';
            const {code: code1, subscriptId: id1} = await actAdd({trx, userId, endpoint, auth, p256dh});
            assert(code1 === actAdd.RESULT_CODE.SUCCESS);
            assert(typeof id1 === 'number');
            const {code: code2, subscriptId: id2} = await actAdd({trx, userId, endpoint, auth, p256dh});
            assert(code2 === actAdd.RESULT_CODE.DUPLICATE);
            assert(id1 === id2);
            await trx.commit();
        } catch (e) {
            console.log(e);
            await trx.rollback();
        }
        await conn.disconnect();
    });

    it('can get subscription by user id', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        const trx = await conn.startTransaction();
        try {
            const userId = USER1_ID;
            const {items} = await actGet({trx, userId});
            assert(Array.isArray(items));
            /** @type {TeqFw_Web_Push_Back_Store_RDb_Schema_Subscript.Dto} */
            const first = items[0];
            assert(first.front_ref === USER1_ID);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
        }
        await conn.disconnect();
    });


});

