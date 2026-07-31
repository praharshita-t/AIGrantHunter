"""
monitor.py

Monitors grant websites and detects new grants.
"""

import json
import os
from .scraper import scrape_website
from .website_configs import WEBSITES


def monitor_websites():
    """
    Monitor configured websites and collect new grants.

    Returns:
        list: Newly discovered grants.
    """
    discovered = []
    seen_urls = set()

    # Loading sample grants removed to ensure only live scraped grants are returned.
    pass

    # 2. Also run the live scrapers to fetch new URLs dynamically
    for website in WEBSITES:
        try:
            grants = scrape_website(website)
            for grant in grants:
                if grant["url"] not in seen_urls:
                    seen_urls.add(grant["url"])
                    discovered.append(grant)
        except Exception as e:
            print(f"Error scraping {website['name']}: {e}")

    return discovered