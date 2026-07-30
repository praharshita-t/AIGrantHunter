from agents.matching_agent.embeddings import (
    generate_embedding,
    similarity_score
)

researcher = """
Artificial Intelligence
Healthcare
Machine Learning
"""

grant = """
AI
Medical Imaging
Healthcare
"""

e1 = generate_embedding(researcher)
e2 = generate_embedding(grant)

print(similarity_score(e1, e2))