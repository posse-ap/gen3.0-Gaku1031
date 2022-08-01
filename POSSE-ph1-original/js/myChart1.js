(function () {
  'use strict';

  var type = 'bar';
  var data = {
    labels: ["", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30"],
    datasets: [{
      data: ['3h', '1h', '5h', '0h', ],
      backgroundColor: '#0070B8',
      borderWidth: 0
    }]
  };
  var options = {
    cutoutPercentage: 40
  };

  var ctx = document.getElementById('myChart1').getContext('2d');
  var myChart = new Chart(ctx, {
    type: type,
    data: data,
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: '8h',
            stepSize: 2,
            callback: function(value, index, values) {
              return value;
            }
          }
        }]
      }
    }
  });
})();