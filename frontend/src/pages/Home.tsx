interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Welcome</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        This is a space for reflection and learning. When you're ready, start a
        conversation below.
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