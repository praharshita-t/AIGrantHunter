import sys
import os

# Import the centralized AI service
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None


def generate_embedding(text: str):
    """
    Returns the cleaned text representation.
    """
    return text.strip()


def similarity_score(embedding1, embedding2) -> float:
    """
    Calculate semantic match score dynamically using the centralized AI service.
    """
    if not ai_service:
        # Fallback keyword overlap ratio
        set1 = set(embedding1.lower().split())
        set2 = set(embedding2.lower().split())
        if not set1 or not set2:
            return 0.0
        return len(set1.intersection(set2)) / max(len(set1), len(set2))
        
    prompt = (
        f"Compare the following two texts and estimate their research/academic alignment.\n\n"
        f"Researcher Profile:\n{embedding1}\n\n"
        f"Grant Details:\n{embedding2}\n\n"
        f"Return a JSON object with a 'similarity' key containing a float value between 0.0 and 1.0 representing the alignment score.\n"
        f"Example: {{\"similarity\": 0.85}}"
    )
    
    try:
        res = ai_service.structured_generate(prompt, response_schema={"similarity": "float"})
        if res and "similarity" in res:
            return float(res["similarity"])
    except Exception as e:
        print(f"AI similarity score failed: {e}")
        
    # Basic fallback
    set1 = set(embedding1.lower().split())
    set2 = set(embedding2.lower().split())
    if not set1 or not set2:
        return 0.0
    return len(set1.intersection(set2)) / max(len(set1), len(set2))