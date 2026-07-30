"""
anrf.py

Fetch grant opportunities from ANRF.
"""

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def scrape_anrf():

    url = "https://anrfonline.in/"

    grants = []

    try:

        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "lxml")

        links = soup.find_all("a", href=True)

        seen = set()

        for link in links:

            title = link.get_text(strip=True)

            href = link["href"]

            IGNORE = {
    "Skip to main content",
    "",
    "Home",
    "Login",
    "Register"
}

            if title.strip() in IGNORE:
                continue

            if len(title) < 12:
                continue

            if href == "#":
                continue
            if "HomePage" in href and title.startswith("अनुसंधान"):
                continue

            if href in seen:
                continue

            seen.add(href)

            if not href.startswith("http"):
                href = "https://anrfonline.in/" + href.lstrip("/")  

            grants.append({
                "agency": "ANRF",
                "title": title,
                "url": href,
                "posted_date": "Unknown"
            })

            if len(grants) >= 10:
                break

    except Exception as e:
        print(f"ANRF Error: {e}")

    return grants