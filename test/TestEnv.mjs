/**
 * Initialize test environment to run tests.
 * @namespace TestEnv
 */
import {dirname, join} from 'path';
import Container from '@teqfw/di';

/**
 * @typedef {Object} TestEnv.Config.Path
 * @memberOf TestEnv.Config
 * @property {string} root path to the root folder of the plugin
 * @property {string} src path to the own sources of the plugin
 * @property {string} test path to the root folder of the tests for the plugin
 */

/**
 * @typedef {Object} TestEnv.Config
 * @property {TestEnv.Config.Path} path paths to various parts of the plugin files
 */

/**
 * Compose configuration object for test env.
 * @type {TestEnv.Config}
 */
const cfg = (function () {
    /* Resolve paths to main folders */
    const url = new URL(import.meta.url);
    const currentScript = url.pathname;
    const pathScript = dirname(currentScript);
    const pathPrj = join(pathScript, '..');
    const pathTest = join(pathPrj, 'test');
    const srcOwn = join(pathPrj, 'src');
    return {
        path: {
            root: pathPrj,
            src: srcOwn,
            test: pathTest,
        }
    };
})();

/**
 * Create and setup DI container (once per all imports).
 * @type {TeqFw_Di_Shared_Container}
 */
const container = await (async function (cfg) {
    /** @type {TeqFw_Di_Shared_Container} */
    const res = new Container();
    const pathNode = join(cfg.path.root, 'node_modules');
    const srcTeqFwDi = join(pathNode, '@teqfw/di/src');
    const srcTeqFwCore = join(pathNode, '@teqfw/core/src');

    // add backend sources to map
    res.addSourceMapping('TeqFw_Core', srcTeqFwCore, true, 'mjs');
    res.addSourceMapping('TeqFw_Di', srcTeqFwDi, true, 'mjs');

    /** @type {TeqFw_Core_Back_Scan_Plugin} */
    const scan = await res.get('TeqFw_Core_Back_Scan_Plugin$');
    const registry = await scan.exec(cfg.path.root);
    /** @type {TeqFw_Core_Back_Defaults} */
    const DEF = await res.get('TeqFw_Core_Back_Defaults$');
    /** @type {typeof TeqFw_Di_Shared_Api_Enum_Area} */
    const AREA = await res.get('TeqFw_Di_Shared_Api_Enum_Area#');
    for (const item of registry.items()) {
        /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
        const desc = item.teqfw[DEF.MOD_DI.NAME];
        /** @type {TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Autoload} */
        const auto = desc.autoload;
        const ns = auto.ns;
        const path = join(item.path, auto.path);
        res.addSourceMapping(ns, path, true);
    }
    for (const item of registry.getItemsByLevels()) {
        /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
        const desc = item.teqfw[DEF.MOD_DI.NAME];
        if (Array.isArray(Object.keys(desc?.replace)))
            for (const orig of Object.keys(desc.replace)) {
                const one = desc.replace[orig];
                if ((one.area === AREA.BACK) || (one.area === AREA.SHARED))
                    res.addModuleReplacement(orig, one.ns);
            }
    }
    return res;
})(cfg);

/**
 * Load local config.
 * @typedef {Object}
 */
const localCfg = await (async function (cfg, container) {
    // DEFINE INNER FUNCTIONS
    /**
     * Default connection parameters to PostgreSQL/MariaDB/MuSQL database.
     * Override these params in local configuration (test/data/cfg/local.json).
     *
     * @return {Object}
     */
    function generateDefault() {
        const connMyPg = {
            "database": "teqfw_db_test",
            "host": "127.0.0.1",
            "password": "PasswordToConnectToTeqFWDb",
            "user": "teqfw"
        };
        const connSqlite = {
            "filename": "./mydb.sqlite"
        };
        return {
            mariadb: {client: "mysql2", connection: connMyPg},
            pg: {client: "pg", connection: connMyPg},
            sqlite: {client: "sqlite3", connection: connSqlite}
        };
    }

    // MAIN FUNCTIONALITY
    /** @type {TeqFw_Db_Back_Defaults} */
    const DEF = await container.get('TeqFw_Db_Back_Defaults$');
    /** @type {TeqFw_Core_Back_Config} */
    const config = await container.get('TeqFw_Core_Back_Config$');
    const pathData = join(cfg.path.test, 'data');
    config.loadLocal(pathData);
    const local = config.getLocal();
    return local[DEF.NAME] ?? generateDefault();
})(cfg, container);

/**
 * Use this function in tests to init DB connections.
 *
 * @return {Promise<TeqFw_Db_Back_RDb_Connect>}
 */
const dbConnect = async function () {
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    const conn = await container.get('TeqFw_Db_Back_RDb_Connect$$'); // instance
    // await conn.init(localCfg.mariadb);
    await conn.init(localCfg.pg);
    // await conn.init(localCfg.sqlite);
    return conn;
}

export {
    cfg,
    container,
    dbConnect
};
