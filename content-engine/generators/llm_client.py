"""
LLM Client handling generative AI completion with fallback to robust local deterministic generator.
"""

import os
import json
import urllib.request
import urllib.parse
from typing import Optional, Dict, Any

class LLMClient:
    def __init__(self):
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY", "").strip()
        self.openai_api_key = os.environ.get("OPENAI_API_KEY", "").strip()

    def has_api_key(self) -> bool:
        return bool(self.gemini_api_key or self.openai_api_key)

    def generate_completion(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """
        Sends prompt to available LLM or returns None if no external API is reachable,
        allowing calling generators to seamlessly use the local rule engine.
        """
        if self.gemini_api_key:
            try:
                return self._call_gemini(prompt, system_prompt)
            except Exception as e:
                print(f"[LLMClient Warning] Gemini API call failed: {e}. Falling back to local generation.")

        if self.openai_api_key:
            try:
                return self._call_openai(prompt, system_prompt)
            except Exception as e:
                print(f"[LLMClient Warning] OpenAI API call failed: {e}. Falling back to local generation.")

        return None

    def _call_gemini(self, prompt: str, system_prompt: Optional[str]) -> str:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_api_key}"
        headers = {"Content-Type": "application/json"}
        
        contents = []
        if system_prompt:
            contents.append({"role": "user", "parts": [{"text": f"SYSTEM INSTRUCTIONS:\n{system_prompt}"}]})
            contents.append({"role": "model", "parts": [{"text": "Understood. I will strictly follow these instructions."}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})

        data = json.dumps({"contents": contents}).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            return res_json["candidates"][0]["content"]["parts"][0]["text"]

    def _call_openai(self, prompt: str, system_prompt: Optional[str]) -> str:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.openai_api_key}"
        }
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        data = json.dumps({"model": "gpt-4o-mini", "messages": messages}).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            return res_json["choices"][0]["message"]["content"]
