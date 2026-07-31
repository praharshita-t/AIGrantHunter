from .embeddings import generate_embedding, similarity_score


def build_profile_text(profile):
    """
    Convert researcher profile into one text block.
    Supports both:
    1. Full researcher profile
    2. Simple keywords list
    """

    # If frontend only sends keywords
    if "keywords" in profile:
        keywords = ", ".join(profile["keywords"])

        return f"""
        Research Areas: {keywords}

        Skills: {keywords}

        Publications:

        Career Stage: Student
        """

    # Full profile
    return f"""
    Research Areas: {', '.join(profile.get('research_areas', []))}

    Skills: {', '.join(profile.get('skills', []))}

    Publications: {', '.join(profile.get('publications', []))}

    Career Stage: {profile.get('career_stage', 'Student')}
    """


def build_grant_text(grant):
    """
    Convert grant information into one text block.
    Handles missing fields gracefully.
    """

    title = grant.get("title", "")
    agency = grant.get("agency", "")
    country = grant.get("country", "")
    research_areas = grant.get("research_areas", [])

    # Fallback: use title if research areas aren't available
    if not research_areas:
        research_areas = [title]

    return f"""
    Title: {title}

    Research Areas: {', '.join(research_areas)}

    Agency: {agency}

    Country: {country}
    """


def match_grants(profile, grants):

    profile_embedding = generate_embedding(
        build_profile_text(profile)
    )

    results = []

    for grant in grants:

        grant_embedding = generate_embedding(
            build_grant_text(grant)
        )

        similarity = similarity_score(
            profile_embedding,
            grant_embedding
        )

        results.append({
            "grant": grant,
            "similarity": similarity
        })

    results.sort(
        key=lambda x: x["similarity"],
        reverse=True
    )

    return results