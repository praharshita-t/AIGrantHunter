def parse_profile(researcher: dict) -> dict:
    """
    Placeholder profile parser.
    Later this will parse uploaded CVs.
    """

    return {
        "name": researcher["name"],
        "career_stage": researcher["career_stage"],
        "research_areas": researcher["research_areas"],
        "skills": researcher["skills"],
        "publications": researcher["publications"],
        "preferred_countries": researcher["preferred_countries"],
    }
