from sklearn.cluster import KMeans

def perform_clustering(embeddings, n_clusters):
    kmeans = KMeans(n_clusters=n_clusters)
    return kmeans.fit_predict(embeddings)
