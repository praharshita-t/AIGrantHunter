"""
ukri.py

Fetch grant opportunities from UK Research and Innovation.
"""

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/138.0.0.0 Safari/537.36"
    )
}


def scrape_ukri():

    url = "https://www.ukri.org/opportunity/"

    grants = []

    try:

        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "lxml")

        links = soup.find_all("a", href=True)

        seen = set()

        IGNORE = {
            "",
            "Home",
            "Search",
            "Menu",
            "Apply",
        }

        for link in links:

            title = link.get_text(strip=True)
            href = link["href"]

            if title in IGNORE:
                continue

            if len(title) < 15:
                continue

            if href in seen:
                continue

            seen.add(href)

            if href.startswith("/"):
                href = "https://www.ukri.org" + href

            if not href.startswith("http"):
                continue

            grants.append({
                "agency": "UKRI",
                "title": title,
                "url": href,
                "posted_date": "Unknown"
            })

            if len(grants) >= 10:
                break

    except Exception as e:
        print(f"UKRI Error: {e}")

    return grants