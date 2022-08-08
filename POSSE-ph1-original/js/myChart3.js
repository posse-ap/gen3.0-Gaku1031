(function () {
  'use strict';

  var type3 = 'doughnut';
  var data3 = {
    labels: ['ドットインストール', 'N予備校', 'POSSE課題'],
    datasets: [{
      data: [20, 40, 40],
      backgroundColor: ['#0042e5', '0070B9', '#01BDDB'],
      borderWidth: 0
    }]
  };
  var options = {
    cutoutPercentage: 40
  };

  var ctx3 = document.getElementById('myChart3').getContext('2d');
  var myChart3 = new Chart(ctx3, {
    type: type3,
    data: data3,
    options: {
      legend :{
        position: 'bottom'
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: '学習コンテンツ',
        fontSize: 18
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