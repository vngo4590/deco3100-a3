var layout = {
    title: "Obama Presidential Tweets",
    hovermode: "closest",
    xaxis: {
        visible: false,
    },
    yaxis: {
        visible: false,
    },
    showlegend: true,
    legend: {
       
        xanchor: "right",
        y:0.1
    }
};

var config = {displayModeBar:false};
var addons = [{
    mode: 'markers',
    type: 'scatter',
    marker: {
        // size: 5,
        colorscale: 'Jet'
    }
}];

readClusteredData("obama-tweets", "scatter-cluster", ["obamacare"],"obama-tweets",addons, layout, config);