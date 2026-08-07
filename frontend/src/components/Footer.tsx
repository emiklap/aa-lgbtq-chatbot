import { colors } from "../theme";

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 16,
        padding: "8px 0",
        fontSize: 12,
        color: colors.textMuted,
        textAlign: "center",
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      This chatbot is for reflection and learning. It is not a therapist, crisis
      service, or medical provider.
    </footer>
  );
}
