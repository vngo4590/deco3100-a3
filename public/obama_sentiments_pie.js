var layout = {
    title: {text:"<b>Obama Presidential Tweets about <br> Obamacare Sentiment in Pie Chart<b>", font: {
        size: 20
    }},
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
        y: 0.1
    }
};

var config = {
    displayModeBar: false
};
var addons = [{
    textposition: "outside",
    automargin: true
    
}];
readClusteredData("obama-tweets", "pie-sentiment", ["obamacare"],"obama-tweets-sentiments-pie",addons, layout, config);