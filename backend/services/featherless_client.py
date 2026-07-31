import os
import re
from openai import OpenAI
from dotenv import load_dotenv

# Ensure environment variables are loaded
load_dotenv(".env.local")
load_dotenv(".env")

# Standard Featherless API Endpoints & Default Models
FEATHERLESS_BASE_URL = "https://api.featherless.ai/v1"
FEATHERLESS_DEFAULT_MODEL = "Qwen/Qwen2.5-14B-Instruct"

def get_featherless_client():
    """
    Initialize and return the OpenAI client configured for the Featherless API.
    Returns None if the key is missing or empty.
    """
    api_key = os.environ.get("GROK_API_KEY", "").strip()
    
    if not api_key or "your_" in api_key:
        print("Warning: GROK_API_KEY is not configured or holds a placeholder value.")
        return None

    try:
        return OpenAI(
            api_key=api_key,
            base_url=FEATHERLESS_BASE_URL
        )
    except Exception as e:
        print(f"Error initializing OpenAI client for Featherless: {e}")
        return None

def execute_chat_completion(messages: list, response_format: dict = None, temperature: float = 0.2) -> str:
    """
    Execute raw chat completion request using the centralized client.
    This is the singular contact point with Featherless API.
    """
    client = get_featherless_client()
    if not client:
        return None

    try:
        kwargs = {
            "model": FEATHERLESS_DEFAULT_MODEL,
            "messages": messages,
            "temperature": temperature
        }
        if response_format:
            kwargs["response_format"] = response_format

        response = client.chat.completions.create(**kwargs)
        return response.choices[0].message.content
    except Exception as e:
        print(f"Featherless API request failed: {e}")
        return None
