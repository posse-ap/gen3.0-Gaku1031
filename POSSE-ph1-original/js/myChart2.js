(function () {
  'use strict';

  var type2 = 'doughnut';
  var data2 = {
    labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'SQL', 'SHELL','情報システム基礎知識(その他)'],
    datasets: [{
      data: [5.9, 11.8, 23.5, 14.7, 8.8, 29.4, 5.9, 0],
      backgroundColor: ['#0042e5', '#0070B9', '#01BDDB', '#02CDFA', '#B29DEE', '#6C43E5', '#460AE8', '#2C00B9'],
      borderWidth: 0
    }]
  };
  var options = {
    cutoutPercentage: 40
  };

  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx2, {
    type: type2,
    data: data2,
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: '学習言語'
      },
      plugins: {
        labels: {
          render: 'percentage',
          fontColor: 'white',
          fontSize: 20
        }
      }
    }
  });
})();