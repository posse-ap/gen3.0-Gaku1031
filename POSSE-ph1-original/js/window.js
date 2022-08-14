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

function determine() {
  const window = document.getElementById('window-3');

  if (window.style.display == 'block') {
    window.style.display = 'none';
  }
}