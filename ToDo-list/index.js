const todoInput = document.getElementById("todo-input")
const todoList = document.querySelector('#todo-list')

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
const savedWeatherData = JSON.parse(localStorage.getItem('saved-weather'));

const createTodo = (storageData) => {
  let todoContents = todoInput.value;
  let complete = false;
  if (storageData) {
    todoContents = storageData.contents;
    complete = storageData.complete;
  }

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
  if (complete) {
    newLi.classList.add('complete')
  }

  newLi.appendChild(newBtn)
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi); 
  saveItemsFn();
  

  todoInput.value = ''
  
}

const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value.trim()) {
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
const apiKey = 'b75c314757d971db1a7dd9cb39fb791f';
const apiKey_default = 'a50ebb9af615c1ed1152e278f7b7b8bf';

const weatherDataActive = ({ location, weather}) => {
  const weatherMainList = [
    'Clear',
    'Clouds',
    'Drizzle',
    'Rain',
    'Snow',
    'Thunderstorm'
  ]

  weather = weatherMainList.includes(weather) ? weather : Fog;
  const locationNameTag = document.querySelector('#locationNameTag');
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url("./images/${weather}.jpg")`;

  if ( 
    !savedWeatherData || 
    savedWeatherData.location !== location || 
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem('saved-weather', JSON.stringify({location, weather}))
  }
}



const weatherSearch = (pos, apiKey) => {
  const {latitude:lat, longitude:lon} = pos;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(url)
    .then((res) => {
      // console.log(res.json());
      return res.json();
    })
    .then((json) => {
      console.log(json.name, json.weather[0].main);
      const weatherData = {
        location : json.name,
        weather : json.weather[0].main
      }
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    })
}

const success = ({ coords }) => {
  const {latitude, longitude} = coords;
  
  const position = {
    latitude,
    longitude
  }

  weatherSearch(position, apiKey_default);
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error)
}

if(savedWeatherData) {
  weatherDataActive(savedWeatherData);
}

askForLocation();
