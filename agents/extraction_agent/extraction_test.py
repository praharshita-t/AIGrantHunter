"""
extraction_test.py

Test script for the Extraction Agent.
"""

from sample_data import sample_page
from service import run_extraction_agent


def main():
    result = run_extraction_agent(sample_page)

    print("=" * 50)
    print("EXTRACTION AGENT OUTPUT")
    print("=" * 50)

    for key, value in result.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()