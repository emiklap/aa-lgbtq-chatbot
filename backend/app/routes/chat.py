from fastapi import APIRouter

from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm_service import get_claude_reply

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    reply = get_claude_reply(request.message)
    return ChatResponse(reply=reply)
