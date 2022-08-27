(function () {
  'use strict';

  var type = 'doughnut';
  var data = {
    labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'SQL', 'SHELL','情報システム基礎知識(その他)'],
    datasets: [{
      data: [30, 20, 10, 5, 5, 20, 20, 10],
      backgroundColor: ['#0042e5', '#0070B9', '#01BDDB', '#02CDFA', '#B29DEE', '#6C43E5', '#460AE8', '#2C00B9'],
      borderWidth: 0
    }]
  };
  var options = {
    cutoutPercentage: 40
  };

  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx, {
    type: type,
    data: data,
    options: {
      legend: {
        position: 'bottom'
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: '学習言語',
        fontSize: 18,
      },
      plugins: {
        labels: {
          render: 'percentage',
          fontColor: 'white',
          precision: 2,
          fontSize: 10
        }
      }
        // datalabels: {
        //   display: true,
        //   font: {
        //     size: 15
        //   }
        // },
      //   labels: {
      //     render: 'percentage',
      //     fontColor: 'black',
      //     fontSize: 20
      //   }
      // }
    }
  });
})();