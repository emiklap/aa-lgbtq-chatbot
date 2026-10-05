import { primaryButtonBase } from "../styles/buttons";

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="mx-auto mt-20 max-w-[600px] rounded-2xl border border-teal/20 bg-linen px-8 py-10 text-center">
      <h1 className="mb-4 font-display text-4xl text-ink">Welcome</h1>
      <p className="mb-6 leading-relaxed text-ink/90">
        A space to reflect on identity, community, and history — at your own
        pace. This chatbot is here to support your reflection and connect you
        with community resources, not to replace real relationships or
        professional support. You can pause, skip, or change topics anytime.
      </p>
      <button
        type="button"
        onClick={onStart}
        className={`${primaryButtonBase} px-6 py-3 text-base`}
      >
        Start Conversation
      </button>
    </div>
  );
}
