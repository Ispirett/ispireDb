import Dexie from  'dexie'

interface Errors{
    findError(query:string | number)
    deleteError(error)

}
class DbErrors implements Errors{
    findError(query:string | number) {
        console.error(`${query} does not Exist`)
    }
    deleteError(error){
        console.error(error)
    }
}

export default class IspireDb{
   _todo;
   _currentTodo;
    private _errorLogger: Errors;

    constructor() {
        this._errorLogger = new DbErrors()
    }


    setup(dbName: string, version:number, ...fields: Array<string>){
        this._todo = new Dexie(dbName);
        this._todo.version(version).stores({
            todo: fields.toString()
        });
    }

    create(details = {}){
        this._currentTodo = this._todo.todo.put(details);
    }

    find(query:string |number, data){
        this._currentTodo.then( () => {
            return this._todo.todo.get(query)
        }).
        then(todo => {
            try {
                if (todo === undefined) {
                  this._errorLogger.findError(query)
                }
                else return data(todo);
            }
            catch (e) {

            }

        }).catch(error =>{
            console.error('Check your db setup or query');

        })
    }

    update(primaryKey: string | number, details = {}) {
      this._todo.todo.update(primaryKey,details)
    }

    destroy(primaryKey: string | number){
        this._todo.todo.delete(primaryKey)
    }


    all(){
        this._todo.todo.toArray().
        then(object =>{
            console.log(object)
        })
    }

}
