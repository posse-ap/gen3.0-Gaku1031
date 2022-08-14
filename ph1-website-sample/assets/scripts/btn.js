'use strict';

let trigger = document.getElementById('btn');


if (trigger) {
  trigger.addEventListener('click', function() {
    let target = document.getElementById('btn');
    target.classList.toggle('active');
    let window = document.getElementById('window');
    window.classList.toggle('panelactive');
  }, false);
}


// document.getElementById('window').style.display = 'none';

// function open() {
//   const window = document.getElementById('window');

//   if (window.style.display == 'none') {
//     window.style.display = 'block';
//   }
// }