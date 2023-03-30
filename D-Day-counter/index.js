const messageContainer = document.querySelector('#d-day-message');
messageContainer.textContent = 'D-Day를 입력해주세요.';


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
    messageContainer.textContent = '타이머가 종료되었습니다.';
  } else if (isNaN(remaining)) {
    console.log('유효한 시간대가 아닙니다.')
    messageContainer.textContent = '형식을 확인해주세요.';
    return;
  } else {
    messageContainer.textContent = 'D-Day를 입력해주세요.';
  }

  const remainingObj = {
    remainingDate : Math.floor(remaining / 3600 / 24),
    remainingHours : Math.floor((remaining / 3600) % 24),
    remainingMin : Math.floor((remaining / 60) % 60),
    remainingSec : Math.floor(remaining) % 60
  }

  const documentObj = {
    days : document.getElementById('day'),
    hours : document.getElementById('hour'),
    minute : document.getElementById('minute'),
    second : document.getElementById('second')
  }

  const timeKeys = Object.keys(remainingObj);
  const docKeys = Object.keys(documentObj);
  
  for (let i =0; i < timeKeys.length; i++) {
    documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  }
}

