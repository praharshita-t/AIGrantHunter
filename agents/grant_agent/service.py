"""
service.py

Public entry point for the Grant Discovery Agent.
"""

from .scheduler import run_scheduler


def run_grant_discovery():
    """
    Execute the Grant Discovery Agent.

    Returns:
        list: Newly discovered grants.
    """

    return run_scheduler()