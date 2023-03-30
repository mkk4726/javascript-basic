const keyCodeCheck = () => {
  if (window.event.keyCode === 13) {
    const inputValue = document.querySelector('#todo-input').value;
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    console.log(inputValue, newLi, newSpan);



  }
}