import Dexie from "dexie";

interface Errors {
  findError(query: string | number);
  deleteError(error);
}

class DbErrors implements Errors {
  findError(query: string | number) {
    console.info(`${query} does not Exist`);
  }
  deleteError(error) {
    console.error(error);
  }
}
interface IsipreExceptions {
  _cause: string;
}

class IspireException implements IsipreExceptions {
  _cause: string;

  constructor(cause: string) {
    this._cause = cause;
  }
}

export default class IspireDb {
  _model;
  _currentModel;
  private _errorLogger: Errors;

  constructor() {
    this._errorLogger = new DbErrors();
  }

  setup(dbName: string, version: number, ...fields: Array<string>) {
    this._model = new Dexie(dbName);
    this._model.version(version).stores({
      model: fields.toString()
    });
  }

  create(details = {}) {
    this._currentModel = this._model.model.put(details);
  }

  find(query: string | number, data) {
    this._currentModel
      .then(() => {
        return this._model.model.get(query);
      })
      .then(model => {
        try {
          if (model === undefined) {
            this._errorLogger.findError(query);
          } else return data(model);
        } catch (e) {}
      })
      .catch(error => {
        console.error("Check your db setup or query");
      });
  }

  update(primaryKey: string | number, details = {}) {
    this._model.model.update(primaryKey, details);
  }

  destroy(primaryKey: string | number) {
    this._model.model.delete(primaryKey);
  }

  destroyAll(countDown: number = 3000) {
     let _this = this;
    setTimeout(function() {
      if (_this._model.delete()){
          console.warn("Database Deleted ",new Date());
          return true;
      }
      else  throw new IspireException(
          "Fail to delete database another process must be in motion please try again"
        );
    }, countDown);
  }

  query() {
    return this._model.model;
  }

  all(callback) {
    this._model.model.toArray().then(object => {
      callback(object);
    });
  }
}
