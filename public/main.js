const clusteredDataDir = "./clustered_data/"
const obamaTweetKmeansPlus = clusteredDataDir + "obama_presidential_tweet_kmeans_plus.csv";
const vocabKmeansPlus = clusteredDataDir + "presidential_vocabulary_vectors_kmeans_plus.csv";
const trumpKmeansPlus = clusteredDataDir + "trump_presidential_tweet_vectors_kmeans_plus.csv";

const mapDataDir = "./potus_twitter_project/";
const obamaTweets = mapDataDir + "obama_presidential_tweets.csv";
const vocabPres = mapDataDir + "presidential_vocabulary.csv";
const trumpTweets = mapDataDir + "trump_presidential_tweets.csv";

const otherDataDir = "./other_data/";
const uninsuredData = otherDataDir + "kff_uninsured_nonelderly.csv";


/**
 * Get data link of the clustered data
 * @param {*} type type of link 
 * @returns 
 */
function getClusteredDataSourceLink(type) {
    let comp = type.toLowerCase().trim();
    switch (comp) {
        case "obama-tweets":
            return [obamaTweets, obamaTweetKmeansPlus];
        case "vocab":
            return [vocabPres, vocabKmeansPlus];
        case "trump-tweets":
            return [trumpTweets, trumpKmeansPlus];
        default:
            return null;
    }
}


function applyScatterCluster(data) {
    let standardSize = 30;
    var result = {
        x: data.map(d => d["x"]),
        y: data.map(d => d["y"]),
        customdata: data.map(d => d["text"]),
        hovertemplate: "%{customdata}" + "<extra></extra>",
        marker: {
            size: data.map(d => d["sentiment"] * standardSize),
            colorscale: 'Jet',
            color: data.map(d => d["cluster_id"]),
        }
    };
    return result;
}

function applyGaugeSentimentAvg(data) {
    var sentiments = data.map(d => parseFloat(d["sentiment"]));
    var sentimentAvg = findAverage(sentiments);
    // Go through every single ccountry and then graph the data based on the layout and the country name
    var result = {
        type: "indicator",
        mode: "gauge+delta",
        value: sentimentAvg
    };
    return result;
}

function applyPieSentiment(data) {
    var sentiments = data.map(d => parseFloat(d["sentiment"]));
    var sentiment_positive = sentiments.filter(d => d > 0);
    var positive_percent = sentiment_positive.length / sentiments.length;
    var result = {
        type: "pie",
        values: [positive_percent, 1 - positive_percent],
        labels: ["Positive", "Negative"],
        textinfo: "label+percent"
    }
    return result;
}

function findAverage(array) {
    if (array.length == 0) {
        return 0;
    }
    var total = 0;
    for (var i in array) {
        total += array[i];
    }
    return total / array.length;
}

function readUninsuredData(documentID, addons, layout, config) {
    let allData = [];

    // Get link of the main data source
    let dataSource = uninsuredData;


    // Plot graph based on data and country
    Plotly.d3.csv(dataSource, function (data) {
        var resultMillions = {
            type: 'bar',
            x: data.map(d => d["year"]),
            y: data.map(d => d["in millions"]),
            name: "million Americans"
        };
        var resultRate = {
            type: 'scatter',
            x: data.map(d => d["year"]),
            y: data.map(d => d["percentage"]),
            name: "percent of all Americans"
        };
        allData.push(resultMillions);
        allData.push(resultRate);
        let addonIndex = 0;
        while (addonIndex < allData.length && addonIndex < addons.length) {
            // Apply addons (entity layouts) onto the traces
            if (addons[addonIndex] != null && addons[addonIndex] != undefined) {
                // Addon to object
                allData[addonIndex] = mergeRecursive(allData[addonIndex], addons[addonIndex]);
                // result = Object.assign(result, addons[0]);
            }
            addonIndex += 1;
        }
        // Graph
        Plotly.newPlot(documentID, allData, layout, config);
    });

}


/**
 * Read the data from the given datasource
 * @param {*} mapData Data to map
 * @param {*} clusteredData Data to map
 * @param {*} documentID Link to doc ID
 * @param {*} addons Array of Addons of each line of the graph
 * @param {*} layout Layout setting 
 * @param {*} config Configuration
 * @returns an object that obtains all values from the datasource
 */
function readClusteredData(srcType, graphType, filter, documentID, addons, layout, config) {
    let allData = [];
    // Get link of the main data source
    let dataSource = getClusteredDataSourceLink(srcType);
    if (dataSource[0] == null || dataSource[1] == null) {
        return;
    }

    // Plot graph based on data and country
    Plotly.d3.csv(dataSource[0], function (mapData) {
        let addonIndex = 0;

        Plotly.d3.csv(dataSource[1], function (clusteredData) {
            // Map tweets to the data
            joinedData = mapData.map((tweet, index) => Object.assign(tweet, clusteredData[index]));

            // Get filtered datas
            var filteredData = joinedData.filter(d => filter.some(topic => d["text"].toLowerCase().includes(topic.toLowerCase())));

            // Go through every single ccountry and then graph the data based on the layout and the country name
            var result;
            if (graphType == "scatter-cluster") {
                result = applyScatterCluster(filteredData);
            } else if (graphType == "gauge-sentiment-avg") {
                result = applyGaugeSentimentAvg(filteredData);
            } else if (graphType == "pie-sentiment") {
                result = applyPieSentiment(filteredData);
            }

            console.log(filteredData.sort((a, b) => {
                return parseFloat(a["sentiment"]) - parseFloat(b["sentiment"]);
            }));

            // Apply addons (entity layouts) onto the traces
            if (addons[addonIndex] != null && addons[addonIndex] != undefined) {
                // Addon to object
                result = mergeRecursive(result, addons[addonIndex]);
                // result = Object.assign(result, addons[0]);
            }


            // Push trace to trace set
            allData.push(result);
            addonIndex += 1;

            // Graph
            Plotly.newPlot(documentID, allData, layout, config);
        });
    });
}





/**
 * Referenced from
    https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
 * Recursively merge properties of two objects 
 * @param {*} obj1
 * @param {*} obj2 
 * @returns The merged object
 */
function mergeRecursive(obj1, obj2) {
    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = mergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            // Create Property if not set
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}