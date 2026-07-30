from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load model only once
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embedding(text: str):
    """
    Generate embedding vector for a given text.
    """
    return model.encode(text)


def similarity_score(embedding1, embedding2):
    """
    Calculate cosine similarity between two embeddings.
    Returns a float between 0 and 1.
    """
    return cosine_similarity(
        [embedding1],
        [embedding2]
    )[0][0]