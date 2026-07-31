import json
import re
import sys
import os
from typing import List, Dict, Any, Optional

# Add current folder to path to allow neighbor imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from featherless_client import execute_chat_completion

def chat(messages: List[Dict[str, str]], temperature: float = 0.2) -> Optional[str]:
    """
    Send message list to Grok chat completions.
    """
    return execute_chat_completion(messages, temperature=temperature)

def generate(prompt: str, system_prompt: Optional[str] = None) -> Optional[str]:
    """
    Generate text completion from a single prompt and optional system instructions.
    """
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    return execute_chat_completion(messages)

def structured_generate(prompt: str, response_schema: Optional[Dict[str, Any]] = None, system_prompt: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """
    Generate structured JSON dictionary completion from a prompt.
    """
    sys_instruction = (
        "You are an expert AI extraction service. You must extract and return structured information. "
        "Your response must be a valid JSON object. Do not include markdown code block markers (like ```json). "
        "Output ONLY the JSON string."
    )
    if system_prompt:
        sys_instruction += f"\nAdditional Instructions: {system_prompt}"
        
    messages = [
        {"role": "system", "content": sys_instruction},
        {"role": "user", "content": prompt}
    ]
    
    response_text = execute_chat_completion(
        messages=messages,
        response_format={"type": "json_object"}
    )
    
    if not response_text:
        return None
        
    try:
        # Clean markdown wrappers if any
        cleaned_json = response_text.strip()
        if cleaned_json.startswith("```"):
            cleaned_json = re.sub(r"^```(?:json)?\n", "", cleaned_json)
            cleaned_json = re.sub(r"\n```$", "", cleaned_json)
            
        return json.loads(cleaned_json)
    except Exception as e:
        print(f"Error parsing structured response to JSON: {e}. Raw response: {response_text}")
        return None
