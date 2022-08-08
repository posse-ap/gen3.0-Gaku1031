var options = {
    series: [{
        name: 'hour',
        data: [3, 4, 5, 3, 0, 0, 4, 2, 2, 8, 8, 2, 2, 1, 7, 4, 4, 3, 3, 3, 2, 2, 6, 2, 2, 1, 1, 1, 7, 8]
    }
    ],
    chart: {
        height: 350,
        toolbar: {
            show: false,
        },
        type: 'bar', //Chart type, bar is a histogram
        animations: {
            enabled: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 10,
            columnWidth: '60%',
        },
    },
    dataLabels: {
        enabled: false //Enable data label, that is, whether to display data directly on the icon
    },
    xaxis: {
        axisTicks: {
            show: false
        },

        axisBorder: {
            show: false
        },

        labels: {
            formatter: function (value) {
                if (value !== undefined) {
                    splittedCategories = value.split(" ")
                    dayNumber = splittedCategories[0]
                    return dayNumber % 2 == 1 ? "" : value;
                }
            },
            style: {
                colors: '#ccc'
            },               
        },
    },

    grid: {
        yaxis: {
            lines: {
                show: false,
            },
        }, 
    },

    yaxis: {
        labels: {
            formatter:function(value) {
                return value + 'h';
            },

            style: {
                colors: '#ccc'
            }
        },
        type:'category',
        axisTicks: {
            show: false,
            width: 1,
        }
    },
    //Set the content of Y axis
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    // Set the fill color
    fill: {
        colors:["#1174BD"],
        type: 'gradient', // gradient
        gradient: {
            type: 'vertical', // The gradient in the vertical direction
            gradientToColors: ['#3BCFFF'], // The color at the end of the gradient
            opacityFrom: 1, // transparency
            opacityTo: 1,
        }
    }, 
    
    responsive: [
        {
        breakpoint: 800,
        options: {
            chart: {
                height: 200
            }
        },
        }
    ]
    
};

    var chart = new ApexCharts(document.querySelector("#myChart1"), options);
    chart.render();