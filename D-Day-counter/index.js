const messageContainer = document.querySelector('#d-day-message');
const dateContainer = document.querySelector('.date__container');
messageContainer.textContent = 'D-Day를 입력해주세요.(ex: 2023-01-01)';
dateContainer.style.display = 'none';


const changeFocus = {
  first : () => {
    let first = document.getElementById('target-year-input').value;
    let second = document.getElementById('target-month-input');
    if (first.length === 4) {
      second.focus()
    }
  }, 
  second : () => {
    let second = document.getElementById('target-month-input').value;
    let third = document.getElementById('target-date-input');
    if (second.length === 2) {
      third.focus()
    }
  }
}

const output = function () {
  console.log("함수를 실행했어요.");
};
const dateFormMaker = () => {
  const inputYear = document.querySelector('#target-year-input').value;
  const inputMonth = document.querySelector('#target-month-input').value;
  const inputDate = document.querySelector('#target-date-input').value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMaker = () => {
  const targetDateInput = dateFormMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    console.log('타이머가 종료되었습니다.');
    dateContainer.style.display = 'none';
    messageContainer.style.display = '';
    messageContainer.textContent = '타이머가 종료되었습니다.';
    messageContainer.style.fontSize = '20px'
    setClearInterval();
  } else if (isNaN(remaining)) {
    console.log('유효한 시간대가 아닙니다.')
    dateContainer.style.display = 'none';
    messageContainer.style.display = '';
    messageContainer.textContent = '형식을 확인해주세요.';
    messageContainer.style.fontSize = '20px'

  } else {
    dateContainer.style.display = '';
    messageContainer.style.display = 'none';
  }

  const remainingObj = {
    remainingDate : Math.floor(remaining / 3600 / 24),
    remainingHours : Math.floor((remaining / 3600) % 24),
    remainingMin : Math.floor((remaining / 60) % 60),
    remainingSec : Math.floor(remaining) % 60
  }

  const timeKeys = Object.keys(remainingObj);
  const docArr = ['day', 'hour', 'minute', 'second'];
  
  dateContainer.style.display = '';

  let i = 0;
  for (let tag of docArr) {
    document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
    i++;
  }
};


const intervalIdArr = [];

const starter = () => {
  messageContainer.style.display = 'none'
  // setInterval(() => {
  //   counterMaker();
  // }, 1000)
  counterMaker();
  const intervalId = setInterval(counterMaker, 1000);
  intervalIdArr.push(intervalId);
  console.log(intervalIdArr);
}

const setClearInterval = () => {
  for (let i = 0; i<intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
  messageContainer.textContent = 'D-Day를 입력해주세요.(ex: 2023-01-01)';
  dateContainer.style.display = 'none';
  messageContainer.style.fontSize = '11px'

}
