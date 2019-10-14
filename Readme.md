
# IspireDb Beta

###### A super simple persistent solution for storing objects in javascript


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them
```
node
```


### Installing
```
npm install ispiredb.js --save 
or 
download ispireDb.bundle.js from the dist folder
```


### Up and running
```
import IspireDb from "./ispiredb";

```


### Examples

```
let article = new  IspireDb();

article.setup('todo',1, '++id','title', 'description', 'complete', 'time');

article.create({ title: 'sweet man', description:'just practicing',complete: 'no',time: new Date() });

article.find(1, data => { console.info(data)}); //=> find object

article.all() //=> Array [articles]
```


## Built With

* Typescript
* javascript
* Webpack
* IndexDB
* Dexie




## Versioning

We use [Npm](http://npm.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ispirett/ispiredb.js/tags). 

## Authors

* **Isaac Browne** - *Initial work* - [Ispirett](https://github.com/isprett)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to typescript indexDb Dexie


