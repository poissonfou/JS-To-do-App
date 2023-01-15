//Model
let todos;

//Retrive localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos')); 
//check if it's an array
if(Array.isArray(savedTodos)){ 
  todos = savedTodos;
}else{
  todos = [{ 
    title: 'Get groceries',
    dueDate: '2021-10-04',
    id: 'id1'
  }, {
    title:'Wash car',
    dueDate: '2021-02-03',
    id: 'id2'
  }, {
    title: 'Make dinner',
    dueDate:'2021-03-04',
    id: 'id3'
  }];
}



//Creates a todo;
function createTodo(title, dueDate){
  const id = '' + new Date().getTime(); 

  todos.push({ 
    title: title,
    dueDate: dueDate,
    id: id
  });

  saveTodos();
}
//Deletes a todo
function removeTodo(idToDelete){
  todos = todos.filter(function (todo){   
    if (todo.id === idToDelete){
      return false;
    }else{
      return true;
    }
  })

  saveTodos();
}

render();

function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(todos)); 
}

//Controller
function addTodo(){
  const textbox = document.getElementById('todo-title');
  const title = textbox.value; 
  
  const datePicker = document.getElementById('date-picker');
  const dueDate = datePicker.value;

  if(title === ''){
    alert('You need to define a title')
  } else { 
    createTodo(title, dueDate);
  
    render();
  }
}

 function deleteTodo(event){
  const deleteButton = event.target; 
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}


//View
function render(){
  //reset our list
  document.getElementById('todo-list').innerHTML = '';

  todos.forEach(function (todo){
    let element = document.createElement('div');
    element.innerText = todo.title  + " " + todo.dueDate;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.style = 'margin-left: 12px;' 
    deleteButton.onclick = deleteTodo; 
    deleteButton.id = todo.id;
    element.appendChild(deleteButton).style.marginRight = '2rem';
    deleteButton.style.borderRadius = '0.5rem';
    deleteButton.style.border = 'none';
    deleteButton.style.height = '2rem';
    deleteButton.style.backgroundColor = 'rgb(43, 163, 211)';
    deleteButton.style.color = 'white';

    let todoList = document.getElementById('todo-list');
    todoList.appendChild(element);
    element.style.height = '3rem';
    element.style.display = 'flex';
    element.style.justifyContent = 'space-between';
    element.style.alignItems = 'center';
    element.style.paddingLeft = '1rem';
    element.style.fontSize = 'larger';
  });
}