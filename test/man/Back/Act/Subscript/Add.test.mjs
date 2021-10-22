/**
 * Add one subscription in test.
 */
import assert from 'assert';
import {container, cfg as cfgTest, dbConnect} from '../../../../TestEnv.mjs';
import {describe, it} from 'mocha';
import {loadRoot} from '../../../lib/util.mjs';


// get runtime objects from DI
/** @type {TeqFw_Db_Back_RDb_Schema} */
const schema = await container.get('TeqFw_Db_Back_RDb_Schema$');
/** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
const crud = await container.get('TeqFw_Db_Back_Api_RDb_ICrudEngine$');
/** @type {TeqFw_User_Back_Store_RDb_Schema_User.Meta} */
const metaUser = await container.get('TeqFw_User_Back_Store_RDb_Schema_User#Meta$');

/** @type {TeqFw_Web_Push_Back_Act_Subscript_Add.act|Function} */
const act = await container.get('TeqFw_Web_Push_Back_Act_Subscript_Add$');

// prepare this unit runtime objects
const USER1_ID = 1;
const path = cfgTest.path.root;
const {dem, cfg} = await loadRoot(container, path);
describe('Act_Subscript_Add', function () {

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
        const key = await crud.create(user1, metaUser, trx);
        assert(key[metaUser.ATTR.ID] === USER1_ID);
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
            const {code: code1, subscriptId: id1} = await act({trx, userId, endpoint, auth, p256dh});
            assert(code1 === act.RESULT_CODE.SUCCESS);
            assert(typeof id1 === 'number');
            const {code: code2, subscriptId: id2} = await act({trx, userId, endpoint, auth, p256dh});
            assert(code2 === act.RESULT_CODE.DUPLICATE);
            assert(id1 === id2);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
        }
        await conn.disconnect();
    });


});

