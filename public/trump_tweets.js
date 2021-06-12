var layout = {
    title: "Trump Presidential Tweets",
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
        size: 5,
        colorscale: 'Jet'
    }
}];

readClusteredData("trump-tweets", "trump-tweets", "text",addons, layout, config);
