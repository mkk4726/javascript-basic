const todoInput = document.getElementById("todo-input")
const todoList = document.querySelector('#todo-list')

const createTodo = () => {  
  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button')

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complete');
  })

  newLi.addEventListener('dblclick', () => {
    newLi.remove();
  })

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn)
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi); 
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
}


const saveItems = () => {
  const saveItems = [];
  for (let tag of todoList.children) {
    const todoObj = {
      contents: tag.querySelector('span').textContent,
      complete: tag.classList.contains('complete')
    }
    saveItems.push(todoObj);
  }
}