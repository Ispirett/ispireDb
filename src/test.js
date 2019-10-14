import IspireDb from "./ispiredb";

let todo = new  IspireDb();
todo.setup('todo',1, '++id','title', 'description', 'complete', 'time');
todo.create({ title: 'sweet man', description:'just practicing',complete: 'no',time: new Date() });
todo.find(1, e => {
    console.log(e)
});



let car = new  IspireDb();
car.setup('car',1, '++id','brand');
car.create({brand: 'tida' });

car.find(1,  (e) => {
    console.log(e)
});

//todo.delete('todo');

todo.destroy(1);
todo.create({title: 'new todo', description:'just practicing',complete: 'no',time: new Date() });
todo.find(1, e => {
    console.log(e)
});
todo.update(1,{ description: 'hello this work', complete: 'yes'});
todo.create({ title: 'sweet ', description:'just practicing',complete: 'no',time: new Date() });
todo.create({ title: 'kool', description:'just practicing',complete: 'no',time: new Date() });
todo.create({ title: 'new', description:'just practicing',complete: 'no',time: new Date() });
todo.create({ title: 'old', description:'just practicing',complete: 'no',time: new Date() });

todo.all();