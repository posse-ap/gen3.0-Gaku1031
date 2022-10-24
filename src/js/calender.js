'use strict';

console.clear();

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 5月, 0から数えて5番目

  function getCalenderHead() {
    const dates = [];
    const d = new Date (year, month, 0).getDate();//先月の末日を取得
    const n =new Date (year, month, 1).getDay();//先月の取得日数(曜日)

    for (let i = 0; i < n; i++) {
    //30
    //29, 30
    //28, 29, 30
    dates.unshift({
      date: d - i,
      isToday: false, //先月なのでfalse
      isDisabled: true,//先月分の処理がdisabledクラスに適用されるのでtrue(先月分の日にちを表示しない)
      isBefore: false,//beforeクラスは今月の日にちに適用するのでfalse
    });
    }

    return dates;
  }

  function getCalenderBody() {
    const dates = []; // date:日付, day:曜日
    const lastDate = new Date(year, month + 1, 0).getDate();//翌月の1日前が末日(翌月1日の1日前で0)

      for (let i = today.getDate(); i <= lastDate; i++) {
          dates.push({
            date: i,
            isToday: false,
            isDisabled: false,
            isBefore: false,
          });
        }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[0].isToday = true;
    }

    return dates;
  }

  function getCalenderTail() { //翌月分の日付の取得
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {//lastDayは今月の末日が何曜日かによって変わる(日曜日なら1, 月曜日なら2...)
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
        isBefore: false,
      });
    }
    return dates;
  }

  function getCalenderBefore() {
    const dates = [];
    const beforeDate = new Date(year, month, today.getDate()).getDate();
    const normalDate = new Date().getDate();

    if (month === today.getMonth()) {
      for (let i = 1; i < beforeDate; i++) {
        dates.push({
          date: i,
          isToday: false,
          isDisabled: false,
          isBefore: true,
        });
      }
    } else {
      for (let i = 1; i < normalDate; i++) {
        dates.push({
          date: i,
          isToday: false,
          isDisabled: false,
          isBefore: false,
        });
      }
    }

    return dates;
    }

  function clearCalender() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);//tbodyに初めの子要素がある限りその子要素を削除する
    }
  }

  function renderTitle() {
    const title = `${year}` + '年' + `${month + 1}` + '月';
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBefore(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];

    const weeks = [];//1週間ごとの配列を取得
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));//spliceでdatesのうち7日分を抜き取ってweeksにpushする
    }

    weeks.forEach (week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;//textContentはHTMLタグが読み込まれない(HTMLを解釈せずそのままテキストが表示される)
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        if (date.isBefore) {
          td.classList.add('before');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();  
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) { //1月より前になったら年を1戻す
      year--;
      month = 11;//11番目の月で12月
    }
    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) { //12月より後になったら年を1増やす
      year++;
      month = 0;//0番目の月で1月
    }
    createCalender();
  });

  createCalender()

