let timerId;
let check = document.getElementById('checked');
let buttonClose = document.getElementById('pop-up-2');
let window2 = document.getElementsByClassName('window-2')[0];
let window1 = document.getElementsByClassName('window-1')[0];
let closeBtn = document.getElementById('close');
let twitterComment = document.getElementById('twitter');
let reload = document.getElementById('close1');


function twitText() {
  let s = twitterComment.value;
  let url = document.location.href;
  
    if (s.length > 140) {
      //文字数制限
      alert("テキストが140字を超えています");
    } else {
      //投稿画面を開く
      url = "https://twitter.com/intent/tweet?text="+ s;
      window.open(url, "_blank", "width=600,height=300");
    }
}

function doReload() {
  // reloadメソッドによりページをリロード
  window.location.reload();
}

function showCompletion() {
  document.getElementById('completion').style.display = 'block';
  timerId = setTimeout(closeCompletion, 3000);
}

function closeCompletion() {
  document.getElementById('completion').style.display = 'none';
  clearTimeout(timerId);//タイマー終了
}

function showLoad() {
  if(check.checked) {
    twitText();
    buttonClose.setAttribute('id', 'pop-up-0');
    reload.addEventListener('click', doReload);
  }
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loader').style.display = 'block';
    timerId = setTimeout(closeLoad, 3000);//タイマーを開始
  }

function closeLoad() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loader').style.display = 'none';
  clearTimeout(timerId);//タイマー終了
}
