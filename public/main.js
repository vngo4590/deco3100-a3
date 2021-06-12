const dataDir = "./clustered_data/"
const obamaTweetKmeansPlus = dataDir + "obama_presidential_tweet_kmeans_plus.csv";
const vocabKmeansPlus = dataDir + "presidential_vocabulary_vectors_kmeans_plus.csv";
const trumpKmeansPlus = dataDir + "trump_presidential_tweet_vectors_kmeans_plus.csv";

const mapDataDir = "./potus_twitter_project/";
const obamaTweets = mapDataDir + "obama_presidential_tweets.csv";
const vocabPres = mapDataDir + "presidential_vocabulary.csv";
const trumpTweets = mapDataDir + "trump_presidential_tweets.csv";



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
function readClusteredData(srcType, documentID, customData, addons, layout, config) {
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
            // Go through every single ccountry and then graph the data based on the layout and the country name

            var result = {
                x: clusteredData.map(d => d["x"]),
                y: clusteredData.map(d => d["y"]),
                customdata: mapData.map(d => d[customData]),
                hovertemplate: "%{customdata}" + "<extra></extra>",
                marker: {
                    size: 4,
                    colorscale: 'Jet',
                    color: clusteredData.map(d => d.cluster_id),
                }
            };

            // Apply addons (entity layouts) onto the traces
            if (addons[addonIndex] != null && addons[addonIndex] != undefined) {
                // Add additional addon to graph
                Object.keys(addons[addonIndex]).forEach(function (key, index) {
                    if (typeof addons[addonIndex][key] === 'object' && result[key] != undefined && result[key] != null) {
                        
                        Object.keys(addons[addonIndex][key]).forEach(function (innerKey, innerIndex) {
                            result[key][innerKey] = addons[addonIndex][key][innerKey];
                        });
                    } else {
                        result[key] = addons[addonIndex][key];
                    }
                });
            }

            // Push trace to trace set
            allData.push(result);
            addonIndex += 1;

            // Graph
            Plotly.newPlot(documentID, allData, layout, config);
        });
    });
}