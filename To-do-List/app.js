const btn = document.getElementById('btn');
const ul = document.querySelector("ul");
const input = document.querySelector('input');
let editMode = false;
let editTaskVal ='';


window.onload =()=>{
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos){
        const todos = JSON.parse(storedTodos);
        todos.forEach(todo => {
            addTodoToList(todo.task, todo.done);
        });
    }
}

// event listener add button
btn.addEventListener('click',()=>{
   if(input.value!==''){

    // for edit
       if(editMode){
            updateTodos(input.value);
            editMode = false;
            editTaskVal = '';
       }else{                       //for add
            const todoItem = {
            task: input.value,
            done: false
            }
            addTodoToList(todoItem.task, todoItem.done);
            saveTodosToLocalStorage(todoItem);

       }
        input.value="";       

    }else{
        input.focus();
        return
   }
});

// event listener for edit and update button
ul.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delBtn')){
        if(confirm("delete task")==true){
            const todoTask = event.target.parentNode.childNodes[0].textContent;
            event.target.parentNode.remove();
            deleteFromTodos(todoTask);
        }
    }

    if(event.target.classList.contains('editBtn')){
        if(confirm('edit task')==true){
            editTaskVal = (event.target.parentNode.childNodes[0].textContent);
            input.value = editTaskVal;
            event.target.parentNode.remove();
            editMode = true;
        }
    }
});

// update todos
function updateTodos(newTaskVal){
    const savedTodos = localStorage.getItem('todos');
       if(savedTodos){
        const todos = JSON.parse(savedTodos);
        const todoToUpdate = todos.find(todo=>todo.task===editTaskVal);
        if(todoToUpdate){
            todoToUpdate.task = newTaskVal;
        }
        localStorage.setItem('todos',JSON.stringify(todos));
        addTodoToList(todoToUpdate.task, todoToUpdate.done)
       }
}


// add todos
function addTodoToList(task, done){
    // console.log(done);
    const liItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.innerText= task;

     // create checkbox
     const checkbox = document.createElement('input');
     checkbox.type ='checkbox';
     checkbox.checked = done;

     // label for checkbox
     let label = document.createElement('label');
     label.htmlFor = 'done';
     label.innerText ="done";


      // delete button
      const delButton = document.createElement('button');
      delButton.innerText = 'Delete';
      delButton.classList.add('delBtn');

      // edit button
      const editBtn = document.createElement('button');
      editBtn.innerText = "Edit";
      editBtn.classList.add('editBtn');

    // click checkbox
     checkbox.addEventListener('change',()=>{
        if(checkbox.checked){
            taskSpan.style.textDecoration = 'line-through';
        }else{
            taskSpan.style.textDecoration = 'none';

        }
        updateCheckList(task, checkbox.checked);

    });
        liItem.appendChild(taskSpan);
        liItem.appendChild(delButton);
        liItem.appendChild(editBtn);
        liItem.appendChild(checkbox);
        liItem.appendChild(label);
        ul.appendChild(liItem);    
}


// save new todos
function saveTodosToLocalStorage(todo){
    
    const savedTodos = localStorage.getItem('todos');
    const todos = savedTodos? JSON.parse(savedTodos):[];
    todos.push(todo); 
    localStorage.setItem('todos',JSON.stringify(todos))
}


// update checkList
function updateCheckList(task, done){
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos){
        const todos = JSON.parse(storedTodos);

        const todoToUpdate = todos.find(todo=>todo.task==task);
       
        if(todoToUpdate){
            todoToUpdate.done = done;
        }
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}




// delete todos
function deleteFromTodos(task){
    const storedTodos = localStorage.getItem('todos');  
    if(storedTodos){
        const todos = JSON.parse(storedTodos);
        const updatedTodo = todos.filter(todo=>todo.task!==task);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

}







