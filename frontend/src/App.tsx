import { useState, type KeyboardEvent } from "react";
import type { Message, ChatResponse } from "./types/api";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ResourcePanel } from "./components/ResourcePanel";
import { FeedbackForm } from "./components/FeedbackForm";
import { colors } from "./theme";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading || paused) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: could not reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage();
  };

  const handleNewTopic = () => {
    setMessages([]);
    setInput("");
    setPaused(false);
  };

  if (!started) {
    return <Home onStart={() => setStarted(true)} />;
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Chatbot Prototype</h1>
      <div
        role="log"
        aria-live="polite"
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 16,
          minHeight: 300,
          marginBottom: 16,
        }}
      >
        {messages.length === 0 && <p style={{ color: colors.textMuted }}>Say hello to start.</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "8px 0", textAlign: m.role === "user" ? "right" : "left" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 4,
                background: m.role === "user" ? colors.accent : colors.surface,
                border: m.role === "user" ? "none" : `1px solid ${colors.border}`,
                color: m.role === "user" ? "#FFFFFF" : colors.text,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: colors.textMuted }}>Thinking...</p>}
      </div>
      <button type="button" onClick={() => setShowResources(true)} style={{ marginBottom: 8, border: `1px solid ${colors.border}`, background: colors.surface, color: colors.text }}>
        Show Resources
      </button>
      <button type="button" onClick={() => setPaused((p) => !p)} style={{ marginBottom: 8, marginLeft: 8, border: `1px solid ${colors.border}`, background: colors.surface, color: colors.text }}>
        {paused ? "Resume" : "Pause"}
      </button>
      <button type="button" onClick={handleNewTopic} disabled={loading} style={{ marginBottom: 8, marginLeft: 8, border: `1px solid ${colors.border}`, background: colors.surface, color: colors.text }}>
        New Topic
      </button>
      <button type="button" onClick={() => setShowFeedback(true)} style={{ marginBottom: 8, marginLeft: 8, border: `1px solid ${colors.border}`, background: colors.surface, color: colors.text }}>
        Feedback
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        <label htmlFor="chat-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Type a message
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={paused ? "Conversation paused" : "Type a message..."}
          disabled={loading || paused}
          style={{ flex: 1, padding: 8, border: `1px solid ${colors.border}` }}
        />
        <button onClick={sendMessage} disabled={loading || paused} style={{ border: `1px solid ${colors.border}`, background: colors.surface, color: colors.text }}>
          Send
        </button>
      </div>
      {showResources && <ResourcePanel onClose={() => setShowResources(false)} />}
      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
      <Footer />
    </div>
  );
}

export default App;
