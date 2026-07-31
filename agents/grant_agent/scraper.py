"""
Each funding agency has its own parser.

To add another agency:

1. Create xyz.py
2. Implement scrape_xyz()
3. Register it in scraper.py

No other files need modification.
"""
from .nsf import scrape_nsf
from .anrf import scrape_anrf
from .ukri import scrape_ukri


def scrape_website(website):

    if website["name"] == "NSF":
        return scrape_nsf()

    elif website["name"] == "ANRF":
        return scrape_anrf()

    elif website["name"] == "UKRI":
        return scrape_ukri()

    return []