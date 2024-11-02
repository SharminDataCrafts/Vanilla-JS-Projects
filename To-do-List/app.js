const btn = document.getElementById('btn');
const ul = document.querySelector("ul");
const input = document.querySelector('input');


window.onload =()=>{
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos){
        const todos = JSON.parse(storedTodos);
        todos.forEach(todo => {
            addTodoToList(todo.task, todo.done);
        });
    }
}


btn.addEventListener('click',()=>{
   if(input.value!==''){
        const todoItem = {
            task: input.value,
            done: false
        }
        addTodoToList(todoItem.task, todoItem.done);
        saveTodosToLocalStorage(todoItem);

        input.value="";       

    }else{
        input.focus();
        return
   }
});


ul.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delBtn')){
        const todoTask = event.target.parentNode.childNodes[0].textContent;
        event.target.parentNode.remove();
        deleteFromTodos(todoTask);
        alert(`task deleted`)
    }

    if(event.target.classList.contains('editBtn')){
        const val = (event.target.parentNode.childNodes[0].textContent);
        input.value = val;
        event.target.parentNode.remove();
        updateTodos(val);

    }
})



// add todos
function addTodoToList(task, done){
    const liItem = document.createElement('li');
    const taskSpan = document.createElement('span')
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
    // console.log(task)
    if(storedTodos){
        const todos = JSON.parse(storedTodos);

        const todoToUpdate = todos.find(todo=>todo.task==task);
       
        if(todoToUpdate){
            todoToUpdate.done = done;
        }
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

// update todos
function updateTodos(value){
    const savedTodos = localStorage.getItem('todos');
       if(savedTodos){
        const todos = JSON.parse(savedTodos)
        const todoToUpdate = todos.filter(todo=>todo.task!==value)
        localStorage.setItem('todos',JSON.stringify(todoToUpdate));
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







