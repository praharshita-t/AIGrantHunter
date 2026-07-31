"""
monitor.py

Monitors grant websites and detects new grants.
"""

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

    for website in WEBSITES:

        grants = scrape_website(website)

        for grant in grants:

            if grant["url"] not in seen_urls:
                seen_urls.add(grant["url"])
                discovered.append(grant)

    return discovered