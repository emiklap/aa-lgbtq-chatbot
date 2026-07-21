import os

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()


class LLMService:
    def __init__(self) -> None:
        self.client = None
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if api_key:
            self.client = Anthropic(api_key=api_key)
        self.model = os.getenv("CLAUDE_MODEL", "claude-3-5-sonnet-latest")

    def get_reply(self, message: str) -> str:
        if self.client is None:
            return (
                "Claude is not configured yet. Set ANTHROPIC_API_KEY to enable "
                "real responses."
            )

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=300,
                temperature=0.7,
                system=(
                    "You are a friendly, supportive chatbot for an LGBTQ+ community "
                    "space. Answer warmly and safely."
                ),
                messages=[{"role": "user", "content": message}],
            )
            return response.content[0].text
        except Exception as exc:  # pragma: no cover - defensive fallback
            return f"Claude request failed: {exc}"


llm_service = LLMService()


def get_claude_reply(message: str) -> str:
    return llm_service.get_reply(message)
