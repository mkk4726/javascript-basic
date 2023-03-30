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

const success = (pos) => {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error, options)
}

askForLocation();

const apiKey = 'a50ebb9af615c1ed1152e278f7b7b8bf';

const weatherSearch = (lat, lon, part, apiKey) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
  
}