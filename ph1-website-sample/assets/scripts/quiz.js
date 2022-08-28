'use strict';

{
  const ALL_QUIZ = [
    {
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      answers: ['約28万人', '約79万人', '約183万人'],
      correctNumber: 1,
      note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
    },
    {
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
      correctNumber: 2,
    },
    {
      question: 'IoTとは何の略でしょう？',
      answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
      correctNumber: 0,
    },
    {
      question: '日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんというか？',
      answers: ['Society 5.0', 'CyPhy', 'SDGs'],
      correctNumber: 0,
      note: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Web3.0', 'NFT', 'メタバース'],
      correctNumber: 0,
    },
    {
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      answers: ['約2倍', '約5倍', '約11倍'],
      correctNumber: 1,
      note: 'Accenture Technology Vision 2021'
    },
  ];
  
  const quizContainer = document.getElementById('js-quizContainer');
  
  //answerIndexは番号、answerは正解の選択肢
  const createQuizHtml = (quizItem, questionNumber) => {
    //answersはALL_QUIZのanswers配列
    //mapを使うことでanswers配列の一つ一つの要素に対して<li></li>を適用させられる
    const answersHtml = quizItem.answers.map((answer, answerIndex) => `<li class="p-quiz-box__answer__item">
          <button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">
            ${answer}<i class="u-icon__arrow"></i>
          </button>
        </li>`
      ).join(''); //配列の連結 <li></li>を連結させて答えの選択肢を記述している
      //joinがなければ配列の[]が表示されてしまう
  
      // 引用テキストの生成
      const noteHtml = quizItem.note ? `<cite class="p-quiz-box__note">
        <i class="u-icon__note"></i>${quizItem.note}
      </cite>` : '';
      //questionNumberは0から始まる問題の順番
      //Q${questionNumber + 1}としているのは1問目が0番目の問題として数えられるから。（<img src="../assets/img/quiz/img-quiz0${questionNumber + 1}.png" alt="">という画像読み込みの部分も同じ。)
      //quizItem.questionはALL_QUIZの中の問題文
      //上で記述したconst = answersHtmlを<ul class="p-quiz-box__answer__list">の後に読みこんで答えの選択肢を表示している。
      //${answersHtml}</ul>の後からは正解ボタンを押した後のhtml
      return `<section class="p-quiz-box js-quiz" data-quiz="${questionNumber}">
        <div class="p-quiz-box__question">
          <h2 class="p-quiz-box__question__title">
            <span class="p-quiz-box__label">Q${questionNumber + 1}</span>
            <span
              class="p-quiz-box__question__title__text">${quizItem.question}</span>
          </h2>
          <figure class="p-quiz-box__question__image">
            <img src="../assets/img/quiz/img-quiz0${questionNumber + 1}.png" alt="">
          </figure>
        </div>
        <div class="p-quiz-box__answer">
          <span class="p-quiz-box__label p-quiz-box__label--accent">A</span>
          <ul class="p-quiz-box__answer__list">
            ${answersHtml}
          </ul>
          <div class="p-quiz-box__answer__correct js-answerBox">
            <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
            <p class="p-quiz-box__answer__correct__content">
              <span class="p-quiz-box__answer__correct__content__label">A</span>
              <span class="js-answerText"></span>
            </p>
          </div>
        </div>
        ${noteHtml}
      </section>`
    }
  //arrays.slice()で()に何も指定しないと配列の先頭が開始位置、末尾が終了地点に設定されるので配列のコピーが作られる。
  //array.lengthは配列の要素の数と同じ。['', '']の場合は2
  //for文は0からarray.length - 1まで処理を繰り返す。
  //Math.floorは小数点以下切り捨てでMath.random() * (i + 1)で0からiまでのランダムな数字を生成する。
  //[array[i], array[randomIndex]] = [array[randomIndex], array[i]];はarrayという配列の要素を入れ替えている。
    const shuffle = arrays => {
      const array = arrays.slice();
      for (let i = array.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array
    }

    const quizArray = shuffle(ALL_QUIZ)

    //シャッフルしたものを連結して表示
    quizContainer.innerHTML = quizArray.map((quizItem, index) => {
      return createQuizHtml(quizItem, index)
    }).join('')
  
    //sectionタグの中のクラス名にjs-quizがついている。各問題文を全て取得
    const allQuiz  = document.querySelectorAll('.js-quiz');
  
    //選択肢の二度押しを防ぐためにanswersのそれぞれにdisabledをつける。
    const setDisabled = answers => {
      answers.forEach(answer => {
        answer.disabled = true;
      })
    }

  //trueかfalseで出力する文字列を出し分ける
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...'; 
    //条件演算子
    //条件式 ? trueの処理 : falseの処理
  }
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }

  //各問題の中での処理
  //getAttributeはhtmlのdate-quiz=という記述に対応している。data-quizは0から数えた問題の順番
  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answer.classList.add('is-selected');
        const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

        //全てのボタンを非活性化
        setDisabled(answers);

        //正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const correctNumber = quizArray[selectedQuiz].correctNumber
        const isCorrect = correctNumber === selectedAnswerNumber; 

        //回答欄にテキストやクラス名を付与
        answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
      })
    })
  })
}