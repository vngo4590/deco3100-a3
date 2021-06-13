var layout = {
    title: "Number of Uninsured and Uninsured Rate <br> among Nonelderly Population",
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
        title: "In Millions",
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
},{
    mode: 'lines+markers',
    marker: {
        color: '#FDB849',
        line: {
            width: 2.5,
            color:'#FDB849'
        }
    }
}];
readUninsuredData('uninsured-graph', addons, layout, config);