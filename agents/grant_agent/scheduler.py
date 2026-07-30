"""
scheduler.py

Simple scheduler for the Grant Discovery Agent.
"""

from monitor import monitor_websites


def run_scheduler():
    """
    Run one discovery cycle.

    Returns:
        list: Newly discovered grants.
    """

    return monitor_websites()