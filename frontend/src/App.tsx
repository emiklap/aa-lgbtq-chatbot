import { useState, type KeyboardEvent } from "react";
import type { Message, ChatResponse } from "./types/api";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ResourcePanel } from "./components/ResourcePanel";
import { FeedbackForm } from "./components/FeedbackForm";
import { primaryButtonBase } from "./styles/buttons";

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

  const toolbarButtonClass = `${primaryButtonBase} shrink-0 px-4 py-2 text-sm`;

  return (
    <div className="mx-auto max-w-[600px] px-4 py-8">
      <h1 className="mb-6 text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
        Chatbot Prototype
      </h1>

      <div
        role="toolbar"
        aria-label="Conversation actions"
        className="mb-4 flex flex-nowrap gap-2 overflow-x-auto py-1 sm:flex-wrap sm:overflow-visible"
      >
        <button type="button" onClick={() => setShowResources(true)} className={toolbarButtonClass}>
          Show Resources
        </button>
        <button type="button" onClick={() => setPaused((p) => !p)} className={toolbarButtonClass}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button type="button" onClick={handleNewTopic} disabled={loading} className={toolbarButtonClass}>
          New Topic
        </button>
        <button type="button" onClick={() => setShowFeedback(true)} className={toolbarButtonClass}>
          Feedback
        </button>
      </div>

      <div
        role="log"
        aria-live="polite"
        className="mb-4 min-h-[300px] rounded-lg border border-teal/20 bg-linen p-4"
      >
        {messages.length === 0 && <p className="text-ink/60">Say hello to start.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`my-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block rounded-lg px-3 py-2 ${
                m.role === "user"
                  ? "bg-teal text-white"
                  : "border border-teal/20 bg-linen text-ink"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-ink/60">Thinking...</p>}
      </div>

      <div className="flex gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Type a message
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={paused ? "Conversation paused" : "Type a message... (Anonymous & Secure)"}
          disabled={loading || paused}
          className="flex-1 rounded-full border border-teal/30 bg-linen px-4 py-2 text-ink placeholder:text-ink/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-50"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={loading || paused}
          aria-label="Send message"
          className={`${primaryButtonBase} grid h-10 w-10 shrink-0 place-items-center`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M17.5 10l-14-7 4.5 7-4.5 7 14-7z" />
          </svg>
        </button>
      </div>

      {showResources && <ResourcePanel onClose={() => setShowResources(false)} />}
      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
      <Footer />
    </div>
  );
}

export default App;
