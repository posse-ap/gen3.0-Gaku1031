'use strict';

document.getElementById('overlay').style.display = 'none';
document.getElementById('window-3').style.display  = 'none';

function showCalender() {
  const overlay = document.getElementById('overlay');
  const window = document.getElementById('window-3');
  
  if (overlay.style.display == 'none') {
    overlay.style.display = 'block';
  } else if (window.style.display == 'none') {
    window.style.display = 'block';
  }
}

function back() {
  const window = document.getElementById('window-3');

  if (window.style.display == 'block') {
    window.style.display = 'none';
  }
}

const currentDate = new Date();

function determine() {
  const window = document.getElementById('window-3');
  const today = document.getElementsByClassName('today')[0];
  const date = today.innerHTML;
  const setDate = document.getElementById('day');
  const setYear = currentDate.getFullYear();
  const setMonth = currentDate.getMonth()+1;

  if (window.style.display == 'block') {
    window.style.display = 'none';
  }

  setDate.value = setYear + '/' + setMonth + '/' + date;
  
}

//今月の年月を取得して画面下部に表示する
// const setYear = currentDate.getFullYear();
// const setMonth = currentDate.getMonth()+1;

// let thisYM = document.getElementById('this-ym');
// thisYM.innerHTML = `${setYear}年${setMonth}月`;