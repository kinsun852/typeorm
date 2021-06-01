"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapacitorDriver = void 0;
var tslib_1 = require("tslib");
var AbstractSqliteDriver_1 = require("../sqlite-abstract/AbstractSqliteDriver");
var CapacitorQueryRunner_1 = require("./CapacitorQueryRunner");
var error_1 = require("../../error");
var CapacitorDriver = /** @class */ (function (_super) {
    tslib_1.__extends(CapacitorDriver, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function CapacitorDriver(connection) {
        var _this = _super.call(this, connection) || this;
        _this.database = _this.options.database;
        _this.driver = _this.options.driver;
        // validate options to make sure everything is set
        if (!_this.options.database)
            throw new error_1.DriverOptionNotSetError("database");
        if (!_this.options.driver)
            throw new error_1.DriverOptionNotSetError("driver");
        // load sqlite package
        _this.sqlite = _this.options.driver;
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Performs connection to the database.
     */
    CapacitorDriver.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.databaseConnection = this.createDatabaseConnection();
                        return [4 /*yield*/, this.databaseConnection];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Closes connection with database.
     */
    CapacitorDriver.prototype.disconnect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var databaseConnection;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.queryRunner = undefined;
                        return [4 /*yield*/, this.databaseConnection];
                    case 1:
                        databaseConnection = _a.sent();
                        return [2 /*return*/, databaseConnection.close().then(function () {
                                _this.databaseConnection = undefined;
                            })];
                }
            });
        });
    };
    /**
     * Creates a query runner used to execute database queries.
     */
    CapacitorDriver.prototype.createQueryRunner = function (mode) {
        if (!this.queryRunner)
            this.queryRunner = new CapacitorQueryRunner_1.CapacitorQueryRunner(this);
        return this.queryRunner;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates connection with the database.
     */
    CapacitorDriver.prototype.createDatabaseConnection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var connection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sqlite.createConnection(this.options.database, false, "no-encryption", 1)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.open()];
                    case 2:
                        _a.sent();
                        // we need to enable foreign keys in sqlite to make sure all foreign key related features
                        // working properly. this also makes onDelete to work with sqlite.
                        return [4 /*yield*/, connection.execute("PRAGMA foreign_keys = ON;")];
                    case 3:
                        // we need to enable foreign keys in sqlite to make sure all foreign key related features
                        // working properly. this also makes onDelete to work with sqlite.
                        _a.sent();
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    CapacitorDriver.prototype.loadDependencies = function () {
        this.sqlite = this.driver;
        if (!this.driver) {
            throw new error_1.DriverPackageNotInstalledError("Capacitor", "@capacitor-community/sqlite");
        }
    };
    return CapacitorDriver;
}(AbstractSqliteDriver_1.AbstractSqliteDriver));
exports.CapacitorDriver = CapacitorDriver;
//# sourceMappingURL=CapacitorDriver.js.map