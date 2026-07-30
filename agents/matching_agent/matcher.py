from embeddings import generate_embedding, similarity_score


def build_profile_text(profile):
    """
    Convert researcher profile into one text block.
    """

    return f"""
    Research Areas: {', '.join(profile['research_areas'])}

    Skills: {', '.join(profile['skills'])}

    Publications: {', '.join(profile['publications'])}

    Career Stage: {profile['career_stage']}
    """


def build_grant_text(grant):
    """
    Convert grant information into one text block.
    """

    return f"""
    Title: {grant['title']}

    Research Areas: {', '.join(grant['research_areas'])}

    Agency: {grant['agency']}

    Country: {grant['country']}
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