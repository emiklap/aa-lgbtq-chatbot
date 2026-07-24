interface ResourcePanelProps {
  onClose: () => void;
}

export function ResourcePanel({ onClose }: ResourcePanelProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 320,
        height: "100%",
        background: "white",
        borderLeft: "1px solid #ddd",
        padding: 24,
        boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
        overflowY: "auto",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{ marginBottom: 16, cursor: "pointer" }}
      >
        Close
      </button>
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Resources</h2>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
        If you or someone you know needs support, these resources are here to
        help:
      </p>
      <ul style={{ fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
        <li>988 Suicide & Crisis Lifeline — call or text 988</li>
        <li>Trevor Project (LGBTQ+ youth) — 1-866-488-7386</li>
        <li>Trans Lifeline — 1-877-565-8860</li>
        <li>Crisis Text Line — text HOME to 741741</li>
      </ul>
    </div>
  );
}