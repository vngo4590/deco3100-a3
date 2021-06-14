var layout = {
    title:
    {
        text: "<b>Number of Uninsured<br> among Nonelderly Population</b>",
        font: {
            size: 20
        }
    },
    font: {
        size: 18,
        family: "Roboto, sans-serif",
        color: "black"
    },
    xaxis: {
        title: "Year",
        autorange:true
    },
    yaxis: {
        title: "Millions of Americans",
        autorange:true
    },
    yaxis2: {
        title: "In Percent",
        autorange:true,
        overlaying: 'y',
        side: 'right',
        position: 0.15
    },
    showlegend: true,
    legend: {
        xanchor: "right"
    }
    
};
var config = {displayModeBar:false};
var addons = [{
    marker: {
        color: '#47abd8'
    }
},{
    mode: 'lines+markers',
    marker: {
        color: '#FF4242',
        line: {
            width: 2.5,
            color:'#FF4242'
        }
    }
}];
readUninsuredData('uninsured-graph', addons, layout, config);