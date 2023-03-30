const todoInput = document.getElementById("todo-input")
const todoList = document.querySelector('#todo-list')

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));


const createTodo = (storageData) => {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }
  
  console.log(todoInput.value);
  console.log(todoContents);

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button')

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complete');
    saveItemsFn();
  })

  newLi.addEventListener('dblclick', () => {
    newLi.remove();
    saveItemsFn();
  })

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn)
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi); 
  // saveItemsFn();
  

  todoInput.value = ''
  
}

const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value) {
       createTodo();
  }
}

const deleteAll = () => {
  const liList = document.querySelectorAll('li');
  for (let li of liList) {
    li.remove();
  }
  saveItemsFn()
}


const saveItemsFn = () => {
  const saveItems = [];
  for (let tag of todoList.children) {
    const todoObj = {
      contents: tag.querySelector('span').textContent,
      complete: tag.classList.contains('complete')
    }
    saveItems.push(todoObj);
  }

  saveItems.length === 0 ? localStorage.removeItem('saved-items') : localStorage.setItem('saved-items', JSON.stringify(saveItems));

};

if (savedTodoList) {
  for (let list of savedTodoList) {
    createTodo(list);
  }
}