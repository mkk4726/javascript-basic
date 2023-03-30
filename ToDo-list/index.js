const todoInput = document.getElementById("todo-list")

const keyCodeCheck = () => {
  const inputValue = document.querySelector('#todo-input').value;
  if (window.event.keyCode === 13 && inputValue !=='') {
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');

    newSpan.textContent = inputValue;
    newLi.appendChild(newSpan);
    todoInput.appendChild(newLi);    


  }
}