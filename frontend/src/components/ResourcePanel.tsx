import { secondaryButtonBase } from "../styles/buttons";

interface ResourcePanelProps {
  onClose: () => void;
}

export function ResourcePanel({ onClose }: ResourcePanelProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-80 overflow-y-auto border-l border-teal/20 bg-linen p-6 shadow-xl">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close resources panel"
        className={`${secondaryButtonBase} mb-4 px-4 py-1.5 text-sm`}
      >
        Close
      </button>
      <h2 className="mb-3 font-display text-lg text-ink">Resources</h2>
      <p className="mb-4 text-sm text-ink">
        If you or someone you know needs support, these resources are here to
        help:
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink">
        <li>988 Suicide & Crisis Lifeline — call or text 988</li>
        <li>Trevor Project (LGBTQ+ youth) — 1-866-488-7386</li>
        <li>Trans Lifeline — 1-877-565-8860</li>
        <li>Crisis Text Line — text HOME to 741741</li>
      </ul>
    </div>
  );
}
