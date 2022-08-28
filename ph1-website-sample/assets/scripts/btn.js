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
