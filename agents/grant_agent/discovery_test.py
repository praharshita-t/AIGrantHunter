"""
discovery_test.py

Test script for the Grant Discovery Agent.
"""

from service import run_grant_discovery


def main():

    grants = run_grant_discovery()

    print("=" * 50)
    print("GRANT DISCOVERY AGENT OUTPUT")
    print("=" * 50)

    for index, grant in enumerate(grants, start=1):

        print(f"\nGrant {index}")

        for key, value in grant.items():
            print(f"{key}: {value}")


if __name__ == "__main__":
    main()