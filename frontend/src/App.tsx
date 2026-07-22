import { useState, type KeyboardEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

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

      const data = await response.json();
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

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Chatbot Prototype</h1>
      <div
        role="log"
        aria-live="polite"
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          minHeight: 300,
          marginBottom: 16,
        }}
      >
        {messages.length === 0 && <p style={{ color: "#888" }}>Say hello to start.</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "8px 0", textAlign: m.role === "user" ? "right" : "left" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 12,
                background: m.role === "user" ? "#DCF8C6" : "#F1F0F0",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: "#888" }}>Thinking...</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <label htmlFor="chat-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Type a message
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={loading}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
