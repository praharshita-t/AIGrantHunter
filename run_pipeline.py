import sys
import os


# Prepend local agent directories to sys.path to resolve cross-agent relative imports and prevent name conflicts
root_dir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(root_dir, "agents", "planning_agent"))
sys.path.insert(0, os.path.join(root_dir, "agents", "matching_agent"))
sys.path.insert(0, os.path.join(root_dir, "agents", "grant_agent"))
sys.path.insert(0, os.path.join(root_dir, "agents", "extraction_agent"))
sys.path.insert(0, root_dir)

from dotenv import load_dotenv
load_dotenv(".env.local")
load_dotenv(".env")
GROK_API_KEY = os.environ.get("GROK_API_KEY", "")

from agents.extraction_agent.service import run_extraction_agent
from agents.extraction_agent.sample_data import sample_page
from agents.matching_agent.sample_data import researcher
from agents.matching_agent.embeddings import generate_embedding, similarity_score
from agents.matching_agent.matcher import build_profile_text, build_grant_text
from agents.matching_agent.scorer import score_grant
from agents.planning_agent.service import run_planning_agent

def main():
    print("==================================================")
    print("🚀 STARTING AI GRANT OPPORTUNITY HUNTER PIPELINE")
    print("==================================================")
    
    # Check key
    if not GROK_API_KEY or "your_" in GROK_API_KEY or len(GROK_API_KEY) < 10:
        print("💡 NOTE: GROK_API_KEY is not configured. Running pipeline in FALLBACK (regex/rules) mode.")
    else:
        print("✨ Grok API key loaded successfully. Running pipeline in LIVE AI mode.")
        
    print("\n--- [STAGE 1] DISCOVERING GRANTS ---")
    print("Discovery agent fetched new grant announcement URLs (simulated).")
    
    print("\n--- [STAGE 2] EXTRACTING INFORMATION (AI) ---")
    print("Sending raw grant page to Extraction Agent...")
    extracted_grant = run_extraction_agent(sample_page)
    print(f"Extracted Title: {extracted_grant.get('title')}")
    print(f"Funding Agency:  {extracted_grant.get('funding_agency')}")
    print(f"Deadline:        {extracted_grant.get('deadline')}")
    print(f"Funding Amount:  {extracted_grant.get('funding_amount')}")
    print(f"Research Areas:  {extracted_grant.get('research_areas')}")
    print(f"Required Docs:   {extracted_grant.get('required_documents')}")

    print("\n--- [STAGE 3] MATCHING & SCORING (AI) ---")
    print(f"Matching grant against profile: Dr. {researcher.get('name')} ({researcher.get('institution')})")
    
    # Calculate similarity score using sentence embeddings
    profile_text = build_profile_text(researcher)
    # Map fields for matching text compatibility
    grant_mapping = {
        "title": extracted_grant.get("title"),
        "research_areas": extracted_grant.get("research_areas"),
        "agency": extracted_grant.get("funding_agency"),
        "country": extracted_grant.get("country"),
    }
    grant_text = build_grant_text(grant_mapping)
    
    p_embedding = generate_embedding(profile_text)
    g_embedding = generate_embedding(grant_text)
    sim = similarity_score(p_embedding, g_embedding)
    
    # Build complete grant dict for scoring (requires all expected fields)
    full_grant = {
        "title": extracted_grant.get("title"),
        "agency": extracted_grant.get("funding_agency"),
        "country": extracted_grant.get("country"),
        "funding": extracted_grant.get("funding_amount"),
        "deadline": extracted_grant.get("deadline"),
        "research_areas": extracted_grant.get("research_areas"),
        "required_documents": extracted_grant.get("required_documents")
    }
    
    recommendation = score_grant(researcher, full_grant, sim)
    
    print(f"Similarity Score: {sim:.4f}")
    print(f"Match Score:      {recommendation['match_score']}/100")
    print(f"Priority Score:   {recommendation['priority_score']}/100")
    print("\n[AI Matching Reasons]:")
    for reason in recommendation['why_this_grant']:
        print(f"  • {reason}")
    print(f"Recommended Action: {recommendation['recommended_action']}")

    print("\n--- [STAGE 4] PLANNING & NOTIFICATION (AI) ---")
    print("Generating checklist and preparation plan...")
    
    # Planning agent expects grant dict containing match and priority scores
    planning_input = {**full_grant, **recommendation}
    plan_results = run_planning_agent(planning_input)
    
    print("\n[AI Application Checklist]:")
    for idx, item in enumerate(plan_results['checklist'], 1):
        print(f"  {idx}. {item}")
        
    print(f"\n[AI Urgency Analysis]: {plan_results['plan']['urgency']}")
    print(f"Estimated Prep Time:   {plan_results['plan']['estimated_days']} days")
    print(f"Action Recommendation:  {plan_results['plan']['recommended_action']}")
    
    print("\n[AI Alert Notification]:")
    print(f"  Title: {plan_results['notification']['title']}")
    print(f"  Alert: {plan_results['notification']['message']}")
    
    print("\n[AI Draft Outreach Email]:")
    print("-" * 50)
    print(plan_results['email']['body'])
    print("-" * 50)

if __name__ == "__main__":
    main()
