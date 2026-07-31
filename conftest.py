"""
conftest.py

Root-level pytest configuration.
Ensures the project root is on sys.path so both `backend.*` and `agents.*`
package imports resolve correctly for all test modules.
"""

import os
import sys

# Insert workspace root so tests can do:  from backend.app import app
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
