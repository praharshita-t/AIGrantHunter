from agents.matching_agent.sample_data import (
    researcher,
    grants
)

from agents.matching_agent.profile_parser import parse_profile
from agents.matching_agent.matcher import match_grants


profile = parse_profile(researcher)

results = match_grants(profile, grants)

for item in results:

    print()

    print(item["grant"]["title"])

    print(item["similarity"])