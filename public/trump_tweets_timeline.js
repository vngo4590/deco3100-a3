// This layout was originally sourced from tutorial 10
var layout = {
    title: {
        text: "<b>Trump Presidential Tweets <br> About Obamacare Changed Overtime</b>",
        font: {
            size: 20
        }
    },
    hovermode: "closest",
    xaxis: {
        range: [-100, 100],
        visible: false,
    },
    yaxis: {
        range: [-100, 100],
        visible: false,
    },
    showlegend: false,
    legend: {
        xanchor: "right",
        y: 0.1
    },
    // Finally, add the slider and use `pad` to position it
    // nicely next to the buttons.
    updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {
            t: 87,
            r: 10
        },
        buttons: [{
            method: 'animate',
            args: [null, {
                mode: 'immediate',
                fromcurrent: true,
                transition: {
                    duration: 3000
                },
                frame: {
                    duration: 2000,
                    redraw: false
                }
            }],
            label: 'Play'
        }, {
            method: 'animate',
            args: [
                [null], {
                    mode: 'immediate',
                    transition: {
                        duration: 0
                    },
                    frame: {
                        duration: 0,
                        redraw: false,

                    }
                }
            ],
            label: 'Pause'
        }]
    }],
    sliders: [{
        pad: {
            l: 150,
            t: 50
        },
        currentvalue: {
            visible: true,
            prefix: 'Year:',
            xanchor: 'right',
            font: {
                size: 20,
                color: '#777'
            }
        },
        steps: null
    }]
};

var config = {
    displayModeBar: false,
    scrollZoom: true
};
var addons = [{
    mode: 'markers',
    type: 'scatter',
    marker: {
        colorscale: [
            ["0.0", "#47abd8"],
            ["1.0", "#FF4242"]
        ]
    }
}];

readClusteredData("trump-tweets", "timeline-scatter-cluster", ["obamacare"], "trump-tweets-timeline", addons, layout, config);