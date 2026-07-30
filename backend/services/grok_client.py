import os
import re
from openai import OpenAI
from dotenv import load_dotenv

# Ensure environment variables are loaded
load_dotenv(".env.local")
load_dotenv(".env")

# Standard xAI API Endpoints & Default Models
XAI_BASE_URL = "https://api.x.ai/v1"
XAI_DEFAULT_MODEL = "grok-2"

def get_grok_client():
    """
    Initialize and return the OpenAI client configured for the Grok API.
    Returns None if the key is missing, empty, a placeholder, or looks like a UUID.
    """
    api_key = os.environ.get("GROK_API_KEY", "").strip()
    
    if not api_key or "your_" in api_key:
        print("Warning: GROK_API_KEY is not configured or holds a placeholder value.")
        return None
        
    # Detect UUIDs to help users who mistakenly copy API Key ID / Team ID instead of secret key
    uuid_pattern = r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
    if re.match(uuid_pattern, api_key, re.IGNORECASE):
        print(
            "\n⚠️ WARNING: The GROK_API_KEY in your .env file looks like a UUID (API Key ID or Team ID).\n"
            "   Grok secret API keys generated from console.x.ai usually start with 'xai-'.\n"
            "   Please click 'Reveal' on the API Keys page to copy the secret key value starting with 'xai-'.\n"
        )
        return None

    try:
        return OpenAI(
            api_key=api_key,
            base_url=XAI_BASE_URL
        )
    except Exception as e:
        print(f"Error initializing OpenAI client for Grok: {e}")
        return None

def execute_chat_completion(messages: list, response_format: dict = None, temperature: float = 0.2) -> str:
    """
    Execute raw chat completion request using the centralized client.
    This is the singular contact point with xAI API.
    """
    client = get_grok_client()
    if not client:
        return None

    try:
        kwargs = {
            "model": XAI_DEFAULT_MODEL,
            "messages": messages,
            "temperature": temperature
        }
        if response_format:
            kwargs["response_format"] = response_format

        response = client.chat.completions.create(**kwargs)
        return response.choices[0].message.content
    except Exception as e:
        print(f"Grok API request failed: {e}")
        return None
