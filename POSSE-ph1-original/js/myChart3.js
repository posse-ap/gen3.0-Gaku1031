var options = {
  stroke: {
      width: 0
  },

  dataLabels: {
    enabled: true,
    style: {
      fontSize: "10px",
    }
  },

  title: {
    text: '学習コンテンツ',
    align: 'left',
    margin: 10,
    style: {
      fontSize:  '18px',
      color:  '#263238'
    },
  },

  series: [20, 40, 40],
  plotOptions: {
    pie: {
      offsetY: 20,
      donut: {
        size: '50px',
      }
    },
  },
  chart: {
    height: 600,
    offsetY: 20,
  animations: {
      enabled: false
  },
  type: 'donut',
  },
  labels: ['ドットインストール', 'N予備校', 'POSSE課題'],

  colors: ['#0042e5', '#0070B9', '#01BDDB'],

  legend: {
      position: 'bottom',
      horizontalAlign: 'left', 
      fontSize: '15px',
  },

  responsive: [{
      breakpoint: 800,
      options: {
        plotOptions: {
          pie: {
          offsetY: 0
          }
        },
        title: {
          style: {
            fontSize:  '13px',
            color:  '#263238'
          }
        },
      chart: {
        height: 300,
        fontSize: 20
      },
      legend: {
          position: 'bottom',
          fontSize: '5px',
      }
      }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#myChart3"), options);
  chart.render();