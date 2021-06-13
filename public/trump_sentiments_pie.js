var layout = {
    title: "Trump Presidential Tweets about Obamacare Sentiment in Pie Chart",
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
"trump-tweets-sentiments"
readClusteredData("trump-tweets", "pie-sentiment", ["obamacare"],"trump-tweets-sentiments-pie",addons, layout, config);