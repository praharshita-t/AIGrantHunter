"""
nsf.py

Fetch grant opportunities from NSF.
"""

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def scrape_nsf():

    url = "https://new.nsf.gov/funding"

    grants = []

    try:

        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "lxml")

        cards = soup.find_all("a", href=True)

        seen = set()

        for card in cards:

            title = card.get_text(strip=True)
            link = card["href"]

            if len(title) < 20:
                continue

            EXCLUDED = [
    "preparing-proposal",
    "submitting-proposal",
    "merit-review",
    "postdocs",
    "graduate-students",
    "early-career",
    "data-management",
    "senior-personnel",
    "initiatives"
]

            if "/funding/opportunities/" not in link:
                continue

            if any(x in link for x in EXCLUDED):
                continue

            if not link.startswith("http"):
                link = "https://new.nsf.gov" + link

            if link in seen:
                continue

            seen.add(link)

            grants.append({
                "agency": "NSF",
                "title": title,
                "url": link,
                "posted_date": "Unknown"
            })

            if len(grants) >= 10:
                break

    except Exception as e:
        print(f"NSF Error: {e}")

    return grants