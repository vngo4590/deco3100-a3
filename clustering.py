import csv
# from _csv import reader
from sklearn.manifold import TSNE
from sklearn.cluster import DBSCAN
from sklearn.cluster import KMeans
from sklearn.cluster import kmeans_plusplus
from sklearn.cluster import MiniBatchKMeans
from sklearn.cluster import OPTICS
import numpy as np



'''
    DISCLAIMER: Most of this code are sourced from the tutorial materials
'''

def export_data(data_location:str):
    '''
    This function is dedicated to reading file input
    '''
    try:
        f = open(data_location, 'r')
    except OSError:
        print ("File cannot be opened {:s}".format(data_location))
        return None
    with f:
        csv_data = csv.reader(f)
        # Use csv iterator to return the next row
        next(csv_data, None)
        vectors = [list(row) for row in csv_data]
        row_ids = [int(row[0]) for row in vectors] #read out the tweet ids
        training_data = [list(map(float, row[1:])) for row in vectors] #prepare training data
        f.close()
        return row_ids, training_data
'''
    We use TSNE because it is more flexible with high dimensional data (> 50)
'''
def tsne_mainfold_transform(training_data:list):
    # default for 2 dimensions
    embedded = TSNE().fit_transform(training_data) #run tsne
    x_output = [float(row[0]) for row in embedded]
    y_output = [float(row[1]) for row in embedded]
    xy_output = [[float(row[0]), float(row[1])] for row in embedded]
    return x_output, y_output, xy_output
def write_to_file(output_file:str, ids:list, x_output:list, y_output:list, clusters:list):
    try:
        f = open(output_file, 'w')
    except OSError:
        print ("File cannot be opened {:s}".format(output_file))
        return None
    with f:
        output_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        output_writer.writerow(["id", "x", "y", "cluster_id"])
        output_writer.writerows(zip(ids, x_output, y_output, clusters))
    return None

# row_ids, training_data = export_data("./potus_twitter_project/obama_presidential_tweet_vectors.csv")
# x_output, y_output, xy_ouput = tsne_mainfold_transform(training_data)
# x_y_array = np.concatenate((x_output, y_output),axis=2)
# print(len(xy_ouput))
# print(len(y_output))
# Use euclidean
# we pick min_samples betwen 2 and 5 because the general rule is to set min_samples >= dimensions 
# Note that 2 gives out a lot of custers, so we will go with 5 
# cluster_dbscan = DBSCAN(min_samples=5, eps=1).fit(xy_ouput)
# print(cluster_dbscan.labels_)
# write_to_file("./clustered_data/obama_presidential_tweet_dbscan.csv", row_ids, x_output, y_output, cluster_dbscan.labels_)

# We will use default of 8
# cluster_kmeans = KMeans().fit_predict(training_data)
# write_to_file("./clustered_data/obama_presidential_tweet_kmeans.csv", row_ids, x_output, y_output, cluster_kmeans)
# print(np.array(training_data[0]))

# cluster_kmeans_plusplus = KMeans(n_clusters=8, init='k-means++').fit(training_data)
# write_to_file("./clustered_data/obama_presidential_tweet_kmeans_plus.csv", row_ids, x_output, y_output, cluster_kmeans_plusplus.labels_)

# cluster_kmeans_minibatch = MiniBatchKMeans().fit_predict(training_data)
# write_to_file("./clustered_data/obama_presidential_tweet_kmeans_minibatch.csv", row_ids, x_output, y_output, cluster_kmeans_minibatch)

# OPtics by standard cluster method = xi
# cluster_kmeans_optics = OPTICS().fit_predict(training_data)
# write_to_file("./clustered_data/obama_presidential_tweet_optics.csv", row_ids, x_output, y_output, cluster_kmeans_optics)
# OPtics by dbscan
# cluster_kmeans_optics = OPTICS(cluster_method="dbscan", min_samples=2).fit_predict(xy_ouput)
# write_to_file("./clustered_data/obama_presidential_tweet_optics_dbscan.csv", row_ids, x_output, y_output, cluster_kmeans_optics)


'''
    Presidential vocab
'''
# row_ids, training_data = export_data("./potus_twitter_project/presidential_vocabulary_vectors.csv")
# x_output, y_output, xy_ouput = tsne_mainfold_transform(training_data)

# cluster_kmeans_plusplus = KMeans(n_clusters=8, init='k-means++').fit(training_data)
# write_to_file("./clustered_data/presidential_vocabulary_vectors_kmeans_plus.csv", row_ids, x_output, y_output, cluster_kmeans_plusplus.labels_)

'''
    Trump tweets
'''
row_ids, training_data = export_data("./potus_twitter_project/trump_presidential_tweet_vectors.csv")
# x_output, y_output, xy_ouput = tsne_mainfold_transform(training_data)
# cluster_kmeans_plusplus = KMeans(n_clusters=8, init='k-means++').fit(training_data)
# write_to_file("./clustered_data/trump_presidential_tweet_vectors_kmeans_plus.csv", row_ids, x_output, y_output, cluster_kmeans_plusplus.labels_)
