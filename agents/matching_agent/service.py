from sample_data import researcher, grants
from matcher import match_grants
from scorer import score_grant


def get_recommendations() -> list:
    """
    Generate ranked grant recommendations.
    """
    matches = match_grants(researcher, grants)

    recommendations = []

    for match in matches:
        recommendations.append(
            score_grant(
                researcher,
                match["grant"],
                match["similarity"]
            )
        )

    # Sort by overall priority
    recommendations.sort(
        key=lambda recommendation: recommendation["priority_score"],
        reverse=True
    )

    return recommendations


def display_recommendations(results: list) -> None:
    """
    Display grant recommendations in a readable format.
    """

    print("\n========== Grant Recommendations ==========\n")

    for result in results:
        print(f"Grant: {result['title']}")
        print(f"Agency: {result['agency']}")
        print(f"Country: {result['country']}")
        print(f"Funding: {result['funding']}")
        print(f"Deadline: {result['deadline']}")
        print(f"Match Score: {result['match_score']}/100")
        print(f"Priority Score: {result['priority_score']}/100")

        print("\nWhy this Grant?")
        for reason in result["why_this_grant"]:
            print(f"  • {reason}")

        print(f"\nRecommended Action: {result['recommended_action']}")
        print("=" * 55)


if __name__ == "__main__":
    recommendations = get_recommendations()
    display_recommendations(recommendations)