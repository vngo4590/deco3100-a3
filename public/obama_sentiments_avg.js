var layout = {
    title: "Average of Sentiment Score on <br>Obama Presidential Tweets about Obamacare",
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
    delta: {
        reference: 0,
        increasing: {
            color: "green"
        },
        decreasing: {
            color: "red"
        }
    },
    gauge: {
        axis: {
            range: [-1, 1],
            tickwidth: 1.0,
            tickcolor: "darkblue"
        },
        bar: {
            color: "darkblue"
        },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [{
                range: [-1, 0],
                color: "cyan"
            },
            {
                range: [0, 1],
                color: "royalblue"
            }
        ],
        threshold: {
            line: {
                color: "red",
                width: 5
            },
            thickness: 1.75,
            value: 0
        }
    }
}];

readClusteredData("obama-tweets", "gauge-sentiment-avg", ["obamacare"],"obama-tweets-sentiments",addons, layout, config);