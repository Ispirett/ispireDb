"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dexie_1 = require("dexie");
var DbErrors = /** @class */ (function () {
    function DbErrors() {
    }
    DbErrors.prototype.findError = function (query) {
        console.error(query + " does not Exist");
    };
    DbErrors.prototype.deleteError = function (error) {
        console.error(error);
    };
    return DbErrors;
}());
var IspireDb = /** @class */ (function () {
    function IspireDb() {
        this._errorLogger = new DbErrors();
    }
    IspireDb.prototype.setup = function (dbName, version) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        this._todo = new dexie_1.default(dbName);
        this._todo.version(version).stores({
            todo: fields.toString()
        });
    };
    IspireDb.prototype.create = function (details) {
        if (details === void 0) { details = {}; }
        this._currentTodo = this._todo.todo.put(details);
    };
    IspireDb.prototype.find = function (query, data) {
        var _this = this;
        this._currentTodo.then(function () {
            return _this._todo.todo.get(query);
        }).
            then(function (todo) {
            try {
                if (todo === undefined) {
                    _this._errorLogger.findError(query);
                }
                else
                    return data(todo);
            }
            catch (e) {
            }
        }).catch(function (error) {
            console.error('Check your db setup or query');
        });
    };
    IspireDb.prototype.update = function (primaryKey, details) {
        if (details === void 0) { details = {}; }
        this._todo.todo.update(primaryKey, details);
    };
    IspireDb.prototype.destroy = function (primaryKey) {
        this._todo.todo.delete(primaryKey);
    };
    IspireDb.prototype.all = function () {
        this._todo.todo.toArray().
            then(function (object) {
            console.log(object);
        });
    };
    return IspireDb;
}());
exports.default = IspireDb;
