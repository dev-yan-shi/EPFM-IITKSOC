google.charts.load('current', {
    packages: ['corechart', 'bar']
});

google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawDualX);

function drawChart() {

    var dataLine = google.visualization.arrayToDataTable([
        ['Date', 'Score1', 'Score2', 'Score3', 'Score4', 'Score5', 'Highest'],
        ["Date(2019, 7, 2)", 75, 70, 71, 72, 73, 97],
        ["Date(2019, 7, 3)", 70, 71, 72, 73, 70, 95],
        ["Date(2019, 7, 4)", 66, 70, 45, 60, 35, 96],
        ["Date(2019, 7, 5)", 90, 65, 45, 35, 24, 92],
    ]);

    var width = $(document.getElementById("line-chart")).width();
    var height = $(document.getElementById("line-chart")).height();

    var optionsLine = {
        width: width,
        height: height,
        title: 'Your Employees Performance Feedback',
        titleColor: 'white',
        titleTextStyle: {
            fontName: 'Raleway',
            fontSize: 18,
            bold: 'True',
        },
        lineWidth: 8,
        hAxis: {
            gridlines: {
                count: 4,
                color: '#444444',
                units: {
                    years: {
                        format: 'MMM dd, yyyy'
                    },
                    months: {
                        format: 'MMM dd, yyyy'
                    },
                    days: {
                        format: 'MMM dd, yyyy'
                    },
                    hours: {
                        format: 'MMM dd, yyyy'
                    },
                    minutes: {
                        format: 'MMM dd, yyyy'
                    },
                    seconds: {
                        format: 'MMM dd, yyyy'
                    },
                    milliseconds: {
                        format: 'MMM dd, yyyy'
                    },
                },
            },
        },
        colors: ['#e54363', '#e95f7a', '#ef6e88', '#d5d3d3', '#d95d7d', '#df6d8d'],
        curveType: 'function',
        legend: {
            position: 'bottom',
            textStyle: {
                color: 'white',
                fontSize: 12,
                fontName: 'Raleway',

            },
        },
        backgroundColor: {
            stroke: '#222222',
            strokeWidth: 0,
            gradient: {
                color1: '#222222',
                color2: '#222222',
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '100%',
                useObjectBoundingBoxUnits: true
            },
        },
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(dataLine, optionsLine);
}

// function drawDualX() {

//     width = $(document.getElementById("leader-board")).width();
//     height = $(document.getElementById("leader-board")).height();

//     var sn = 55;
//     var arrMain = [['Name', 'Feedback Score', {
//         role: 'style'
//     }],['Snehil Saluja', sn, '#E54E63'],
//     ['Yash Maheshwari', 76, '#E54E63'],
//     ['Piyush Rane', 72, '#E54E63'],
//     ['Devyanshi Singh', 68, '#E54E63'],
//     ['Manoti Agarwal', 66, '#E54E63']]
//     var data = google.visualization.arrayToDataTable(arrMain);

//     var view = new google.visualization.DataView(data);
//     view.setColumns([0, 1,
//         {
//             calc: "stringify",
//             sourceColumn: 1,
//             type: "string",
//             role: "annotation"
//         },
//         2
//     ]);
//     var options = {
//         backgroundColor: '#222222',
//         title: 'Your Employeees on the leaderboard',
//         titleTextStyle: {
//             fontName: 'Raleway',
//             fontSize: 18,
//             color: 'white',
//             bold: 'True',
//         },
//         lineWidth: 8,
//         width: width,
//         height: height,
//         chart: {
//             title: 'Leaderboard',
//             subtitle: 'Based on most recent and previous data'
//         },
//         hAxis: {
//             textStyle: {
//                 color: 'white',
//                 fontName: 'Raleway',
//                 fontSize: 12

//             },
//             baselineColor: 'white',
//             gridlines: {
//                 color: 'white'
//             },
//             color: 'white',
//             title: 'Scores'
//         },
//         vAxis: {
//             textStyle: {
//                 color: 'white',
//                 fontName: 'Raleway',
//                 fontSize: 12

//             },
//             baselineColor: 'white',
//             gridlines: {
//                 color: 'white'
//             },
//             color: 'white',
//             title: 'Name'
//         },
//         bars: 'horizontal',
//         series: {
//             0: {
//                 axis: 'Feedback Score'
//             },
//         },
//         axes: {
//             x: {
//                 2000: {
//                     label: 'Feedback Scores'
//                 },
//             },
//         },
//     };
//         var materialChart = new google.visualization.BarChart(document.getElementById('chart_div'));
//         materialChart.draw(view, options);
// }


//my copy for experiment
function drawDualX() {

    width = $(document.getElementById("leader-board")).width();
    height = $(document.getElementById("leader-board")).height();

    var sn = 55;
    var arrMain = [];
    var header = [
        {label: 'Name', type: 'string'},
        {label: 'Feedback Score', type: 'number'},
        {role: 'style'}];
    arrMain.push(header);
    db.collection('employ').orderBy('percentScore').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            var arr = [];
            var empName = change.doc.data().name;
            var empScore = change.doc.data().percentScore;
            if(empScore==parseInt(empScore)) empScore=parseInt(empScore);
            else if(empScore==parseFloat(empScore)) empScore=parseFloat(empScore);
            var color = "#E54E63";
            arr.push(empName);
            arr.push(empScore);
            arr.push(color);
            //console.log(arrMain);
            arrMain.push(arr);
        })
    })
    var data = google.visualization.arrayToDataTable(arrMain);
    console.log(data);
    // ['Name', 'Feedback Score', {
    //     role: 'style'
    // }],['Snehil Saluja', sn, '#E54E63'],
    // ['Yash Maheshwari', 76, '#E54E63'],
    // ['Piyush Rane', 72, '#E54E63'],
    // ['Piyush', 70, '#E54E63'],
    // ['Devyanshi Singh', 68, '#E54E63'],
    // ['Manoti Agarwal', 66, '#E54E63']

    // db.collection('employ').orderBy('percentScore').onSnapshot(snapshot => {
    //     let changes = snapshot.docChanges();
    //     changes.forEach(change => {
    //         var empName = change.doc.data().name;
    //         var score = change.doc.data().percentScore;
    //         var arr = [empName,score,"#E54E63"];
    //         //console.log(arrMain);
    //         arrMain.push(arr);
    //     })
    // })

//     var data=[];
//  var Header= ['Element', 'Density', { role: 'style' }];
//  data.push(Header);
//  for (var i = 0; i < chartsdata.length; i++) {
//       var temp=[];
//       temp.push(chartsdata[i].MonthValue);
//       temp.push(chartsdata[i].CountValue);

//       data.push(temp);
//   }
// var chartdata = new google.visualization.arrayToDataTable(data);

    console.log(arrMain);
    
    //console.log(data);
    //var view = new google.visualization.DataView(data);
    // view.setColumns([0, 1,
    //     {
    //         calc: "stringify",
    //         sourceColumn: 1,
    //         type: "string",
    //         role: "annotation"
    //     },
    //     2
    // ]);
    var options = {
        backgroundColor: '#222222',
        title: 'Your Employeees on the leaderboard',
        titleTextStyle: {
            fontName: 'Raleway',
            fontSize: 18,
            color: 'white',
            bold: 'True',
        },
        lineWidth: 8,
        width: width,
        height: height,
        chart: {
            title: 'Leaderboard',
            subtitle: 'Based on most recent and previous data'
        },
        hAxis: {
            textStyle: {
                color: 'white',
                fontName: 'Raleway',
                fontSize: 12

            },
            baselineColor: 'white',
            gridlines: {
                color: 'white'
            },
            color: 'white',
            title: 'Scores'
        },
        vAxis: {
            textStyle: {
                color: 'white',
                fontName: 'Raleway',
                fontSize: 12

            },
            baselineColor: 'white',
            gridlines: {
                color: 'white'
            },
            color: 'white',
            title: 'Name'
        },
        bars: 'horizontal',
        series: {
            0: {
                axis: 'Feedback Score'
            },
        },
        axes: {
            x: {
                2000: {
                    label: 'Feedback Scores'
                },
            },
        },
    };
        var materialChart = new google.visualization.BarChart(document.getElementById('chart_div'));
        materialChart.draw(data, options);
}

google.charts.load('current', {
    packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChartSingle);

function drawChartSingle() {


    width = $(document.getElementById("leader-board")).width();
    height = $(document.getElementById("leader-board")).height();


    var dataLine = google.visualization.arrayToDataTable([
        ['Date', 'Score', 'Highest'],
        ["Date(2019, 7, 2)", 75, 97],
        ["Date(2019, 7, 3)", 70, 95],
        ["Date(2019, 7, 4)", 66, 96],
        ["Date(2019, 7, 5)", 90, 92],
    ]);

    var optionsLine = {
        width: width,
        height: height,
        title: 'Your Performance Feedback',
        titleColor: 'white',
        titleTextStyle: {
            fontName: 'Raleway',
            fontSize: 18,
            bold: 'True',
        },
        lineWidth: 8,
        hAxis: {
            gridlines: {
                count: 4,
                color: '#444444',
                units: {
                    years: {
                        format: 'MMM dd, yyyy'
                    },
                    months: {
                        format: 'MMM dd, yyyy'
                    },
                    days: {
                        format: 'MMM dd, yyyy'
                    },
                    hours: {
                        format: 'MMM dd, yyyy'
                    },
                    minutes: {
                        format: 'MMM dd, yyyy'
                    },
                    seconds: {
                        format: 'MMM dd, yyyy'
                    },
                    milliseconds: {
                        format: 'MMM dd, yyyy'
                    },
                },
            },
        },
        colors: ['#e54363', '#e95f7a', '#ef6e88'],
        curveType: 'function',
        legend: {
            position: 'bottom',
            textStyle: {
                color: 'white',
                fontSize: 12,
                fontName: 'Raleway',

            },
        },
        backgroundColor: {
            stroke: '#222222',
            strokeWidth: 0,
            gradient: {
                // Start color for gradient.
                color1: '#222222',
                // Finish color for gradient.
                color2: '#222222',
                // Where on the boundary to start and
                // end the color1/color2 gradient,
                // relative to the upper left corner
                // of the boundary.
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '100%',
                // If true, the boundary for x1,
                // y1, x2, and y2 is the box. If
                // false, it's the entire chart.
                useObjectBoundingBoxUnits: true
            },
        },
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_single'));

    chart.draw(dataLine, optionsLine);
}