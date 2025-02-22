from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/categorize', methods=['POST'])
def categorize_tabs():
    data = request.json
    titles = [tab['title'] for tab in data]
    urls = [tab['url'] for tab in data]

    # Combine titles and URLs for embedding
    texts = [f"{title} {url}" for title, url in zip(titles, urls)]

    # Generate embeddings
    embeddings = model.encode(texts)

    # Determine the number of clusters (categories)
    n_clusters = min(len(texts) // 2, 10)  # Adjust as needed

    # Perform clustering
    kmeans = KMeans(n_clusters=n_clusters)
    kmeans.fit(embeddings)

    # Assign categories
    categories = {}
    for i, label in enumerate(kmeans.labels_):
        category = f"Group {label + 1}"
        if category not in categories:
            categories[category] = []
        categories[category].append(i)

    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True)
