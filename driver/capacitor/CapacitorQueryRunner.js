"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapacitorQueryRunner = void 0;
var tslib_1 = require("tslib");
var QueryRunnerAlreadyReleasedError_1 = require("../../error/QueryRunnerAlreadyReleasedError");
var QueryFailedError_1 = require("../../error/QueryFailedError");
var AbstractSqliteQueryRunner_1 = require("../sqlite-abstract/AbstractSqliteQueryRunner");
var Broadcaster_1 = require("../../subscriber/Broadcaster");
/**
 * Runs queries on a single sqlite database connection.
 */
var CapacitorQueryRunner = /** @class */ (function (_super) {
    tslib_1.__extends(CapacitorQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function CapacitorQueryRunner(driver) {
        var _this = _super.call(this) || this;
        _this.driver = driver;
        _this.connection = driver.connection;
        _this.broadcaster = new Broadcaster_1.Broadcaster(_this);
        return _this;
    }
    CapacitorQueryRunner.prototype.executeSet = function (set) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var databaseConnection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isReleased)
                            throw new QueryRunnerAlreadyReleasedError_1.QueryRunnerAlreadyReleasedError();
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        databaseConnection = _a.sent();
                        return [2 /*return*/, databaseConnection.executeSet(set, false)];
                }
            });
        });
    };
    /**
     * Executes a given SQL query.
     */
    CapacitorQueryRunner.prototype.query = function (query, parameters) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var databaseConnection, pResult, command;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isReleased)
                            throw new QueryRunnerAlreadyReleasedError_1.QueryRunnerAlreadyReleasedError();
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        databaseConnection = _a.sent();
                        this.driver.connection.logger.logQuery(query, parameters, this);
                        command = query.substr(0, query.indexOf(" "));
                        if ([
                            "PRAGMA",
                            "BEGIN",
                            "ROLLBACK",
                            "COMMIT",
                            "CREATE",
                            "ALTER",
                            "DROP",
                        ].indexOf(command) !== -1) {
                            pResult = databaseConnection.execute(query, false);
                        }
                        else if (["INSERT", "UPDATE", "DELETE"].indexOf(command) !== -1) {
                            pResult = databaseConnection
                                .run(query, parameters, false)
                                .then(function (_a) {
                                var changes = _a.changes;
                                return changes.lastId || changes.changes;
                            });
                        }
                        else {
                            pResult = databaseConnection
                                .query(query, parameters)
                                .then(function (_a) {
                                var values = _a.values;
                                return values;
                            });
                        }
                        return [2 /*return*/, pResult.catch(function (err) {
                                _this.driver.connection.logger.logQueryError(err, query, parameters, _this);
                                throw new QueryFailedError_1.QueryFailedError(query, parameters, err);
                            })];
                }
            });
        });
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Parametrizes given object of values. Used to create column=value queries.
     */
    CapacitorQueryRunner.prototype.parametrize = function (objectLiteral) {
        return Object.keys(objectLiteral).map(function (key) { return "\"" + key + "\"" + "=?"; });
    };
    return CapacitorQueryRunner;
}(AbstractSqliteQueryRunner_1.AbstractSqliteQueryRunner));
exports.CapacitorQueryRunner = CapacitorQueryRunner;
//# sourceMappingURL=CapacitorQueryRunner.js.map