let options2 = {
    stroke: {
        width: 0
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px',
      }
    },

    title: {
      text: '学習言語',
      align: 'left',
      margin: 10,
      style: {
        fontSize:  '18px',
        color:  '#263238'
      },
    },

    series: [30, 20, 10, 5, 5, 20, 20, 10],
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
    labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'SQL', 'SHELL','情報システム基礎知識(その他)'],

    colors: ['#0042e5', '#0070B9', '#01BDDB', '#02CDFA', '#B29DEE', '#6C43E5', '#460AE8', '#2C00B9'],

    legend: {
        position: 'bottom',
        horizontalAlign: 'left', 
        fontSize: '15px'
    },

    responsive: [{
        breakpoint: 800,
        options: {
          plotOptions: {
            pie: {
            offsetY: 0,
            }
          },
          title: {
            style: {
              fontSize:  '13px',
              color:  '#263238'
            }
          },
        chart: {
          fontSize: 5,
        },
        legend: {
            position: 'bottom',
            fontSize: '5px',
        }
      }
    }]
  };

  let chart2 = new ApexCharts(document.querySelector("#myChart2"), options2);
  chart2.render();