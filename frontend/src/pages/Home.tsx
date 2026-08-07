interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Welcome</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        A space to reflect on identity, community, and history — at your own
        pace. This chatbot is here to support your reflection and connect you
        with community resources, not to replace real relationships or
        professional support. You can pause, skip, or change topics anytime.
      </p>
      <button
        type="button"
        onClick={onStart}
        style={{ padding: "10px 24px", fontSize: 16, borderRadius: 8, cursor: "pointer" }}
      >
        Start Conversation
      </button>
    </div>
  );
}