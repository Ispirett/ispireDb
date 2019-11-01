"use strict";
exports.__esModule = true;
var dexie_1 = require("dexie");
var DbErrors = /** @class */ (function () {
    function DbErrors() {
    }
    DbErrors.prototype.findError = function (query) {
        console.info(query + " does not Exist");
    };
    DbErrors.prototype.deleteError = function (error) {
        console.error(error);
    };
    return DbErrors;
}());
var IspireException = /** @class */ (function () {
    function IspireException(cause) {
        this._cause = cause;
    }
    return IspireException;
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
        this._model = new dexie_1["default"](dbName);
        this._model.version(version).stores({
            model: fields.toString()
        });
    };
    IspireDb.prototype.create = function (details) {
        if (details === void 0) { details = {}; }
        this._currentModel = this._model.model.put(details);
    };
    IspireDb.prototype.find = function (query, data) {
        var _this_1 = this;
        try {
            this._currentModel
                .then(function () {
                return _this_1._model.model.get(query);
            })
                .then(function (model) {
                try {
                    if (model === undefined) {
                        // this._errorLogger.findError(query);
                    }
                    else
                        return data(model);
                }
                catch (e) {
                }
            })["catch"](function (error) {
                console.error("Check your db setup or query");
            });
        }
        catch (e) {
        }
    };
    IspireDb.prototype.update = function (primaryKey, details) {
        if (details === void 0) { details = {}; }
        this._model.model.update(primaryKey, details);
    };
    IspireDb.prototype.destroy = function (primaryKey) {
        this._model.model["delete"](primaryKey);
    };
    IspireDb.prototype.destroyAll = function (countDown) {
        if (countDown === void 0) { countDown = 3000; }
        var _this = this;
        setTimeout(function () {
            if (_this._model["delete"]()) {
                console.warn("Database Deleted ", new Date());
                return true;
            }
            else
                throw new IspireException("Fail to delete database another process must be in motion please try again");
        }, countDown);
    };
    IspireDb.prototype.query = function () {
        return this._model.model;
    };
    IspireDb.prototype.all = function (callback) {
        this._model.model.toArray().then(function (object) {
            callback(object);
        });
    };
    return IspireDb;
}());
exports["default"] = IspireDb;
