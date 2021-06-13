var layout = {
    title: "Trump Presidential Tweets About Obamacare",
    hovermode: "closest",
    xaxis: {
        visible: false,
    },
    yaxis: {
        visible: false,
    },
    showlegend: false,
    legend: {
       
        xanchor: "right",
        y:0.1
    }
};

var config = {displayModeBar:false, scrollZoom: true};
var addons = [{
    mode: 'markers',
    type: 'scatter',
    marker: {
        // size: 5,
        colorscale: 'Jet'
    }
}];

readClusteredData("trump-tweets", "scatter-cluster", ["obamacare"], "trump-tweets", addons, layout, config);
