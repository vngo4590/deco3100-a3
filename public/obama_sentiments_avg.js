var layout = {
    title: {text:"<b>Average of Sentiment Score on <br>Obama Presidential Tweets about Obamacare</b>", font: {size:20}},
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
            color: "#47abd8"
        },
        decreasing: {
            color: "#FF4242"
        }
    },
    gauge: {
        axis: {
            range: [-1, 1],
            tickwidth: 1.0,
            tickcolor: "darkblue"
        },
        bar: {
            color: "white"
        },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "white",
        steps: [{
                range: [-1, 0],
                color: "#FF4242"
            },
            {
                range: [0, 1],
                color: "#47abd8"
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