//Creating an empty array in which various todos will enter.
let task = [];

//This is the function which will be responsible for adding todos.
function manipulate(textInp, s, id) {
    let t = {
        descript: textInp,
        Status: s,
        id: id
    }
    task.push(t);
    render(t);
}

let i = 0;
let input = document.querySelector('#task');

//Created for adding todo with the enter key.
input.addEventListener('keypress', function(todo){
    if (todo.key === 'Enter'){
        todo.preventDefault();
        addTask();
    }
})

//Onclick function when '+' button will be clicked.
function addTask() {

    if (input.value === '' || input.value.trim() === '') {
        document.getElementById('error').textContent = 'Enter a task';
    }

    else {
        document.getElementById('error').textContent = '';
        let textInp = input.value.trim();
        let id = i;
        let s = 0;
        manipulate(textInp, s, id);
        input.value = '';
        i++;
    }
}

//Rendering the array 'task'.
function render(t) {
    let li = document.createElement('li');
    li.setAttribute('class', i);
    li.append(t.descript);
    if (t.Status == 0) {
        let todo = document.querySelector('.toDo');
        todo.append(li);
        remove(li);
        start(li);
        
    }
    else if (t.Status == 1) {
        let inprog = document.querySelector('.Inprogress');
        inprog.append(li);
        remove(li);
        done(li);
    }
    else if (t.Status == 2) {
        let comp = document.querySelector('.Completed');
        comp.append(li);
        remove(li);
    }
}

//Remove button function.
function remove(li) {
    let rmvBtn = document.createElement('button');
    let rmv = document.createTextNode('Remove');
    rmvBtn.append(rmv);
    li.append(rmvBtn);
    rmvBtn.addEventListener('click', function () {
        let liclass = li.class;
        li.remove();
        if (task[liclass].Status == 0) {
            i--;
        }
        task = task.filter(b => b.id != liclass);
        console.log(task);
    })
}

//Start button function.
function start(li) {
    let strBtn = document.createElement('button');
    let str = document.createTextNode('Start');
    strBtn.append(str);
    li.append(strBtn);
    strBtn.addEventListener('click', function () {
        let liclass = li.class;
        console.log(liclass);
        li.remove();
        let e = task[liclass];
        e.Status = 1;
        console.log(e);
        console.log(task);
        let t = e;
        render(t);
    })
}


//Done button function.
function done(li) {
    let dnBtn = document.createElement('button');
    let dn = document.createTextNode('Done');
    dnBtn.append(dn);
    li.append(dnBtn);
    dnBtn.addEventListener('click', function () {
        li.remove();
        let liclass = li.class;
        console.log(liclass);
        let e = task[liclass - 1];
        console.log(e);
        e.Status = 2;
        console.log(e);
        let t = e;
        render(t);
    })
}