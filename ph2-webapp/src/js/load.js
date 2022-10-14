let timerId;

function showLoad() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loader').style.display = 'block';
  timerId = setTimeout(closeLoad, 5000);//タイマーを開始
}

function closeLoad() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loader').style.display = 'none';
  clearTimeout(timerId);//タイマー終了
}
