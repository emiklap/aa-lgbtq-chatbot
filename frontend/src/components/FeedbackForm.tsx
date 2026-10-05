import { useState } from "react";
import type { FeedbackRequest } from "../types/api";
import { primaryButtonBase, secondaryButtonBase } from "../styles/buttons";

interface FeedbackFormProps {
  onClose: () => void;
}

export function FeedbackForm({ onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Single entry point for submission — swap the console.log for a POST to /api/feedback here.
  const submitFeedback = () => {
    if (rating === null) return;

    const feedback: FeedbackRequest = { rating, comment: comment.trim() || undefined };
    console.log(feedback);

    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-form-heading"
      className="fixed inset-0 flex items-center justify-center bg-charcoal/50 p-4"
    >
      <div className="w-80 rounded-2xl border border-teal/20 bg-linen p-6 shadow-xl">
        {submitted ? (
          <>
            <h2 id="feedback-form-heading" className="mb-3 font-display text-lg text-ink">
              Thank you for your feedback
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={`${secondaryButtonBase} px-4 py-1.5 text-sm`}
            >
              Close
            </button>
          </>
        ) : (
          <>
            <h2 id="feedback-form-heading" className="mb-3 font-display text-lg text-ink">
              Feedback
            </h2>
            <div className="mb-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => {
                const filled = value <= (hoverRating ?? rating ?? 0);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value} out of 5`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(null)}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-teal/20 bg-linen text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                      filled ? "text-gold-dark" : "text-ink/40"
                    }`}
                  >
                    {filled ? "★" : "☆"}
                  </button>
                );
              })}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              placeholder="Optional comment"
              className="mb-2 min-h-20 w-full rounded-lg border border-teal/20 bg-linen p-2 font-body text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            />
            <p className="mb-4 text-xs text-ink/70">
              Please don't include personal details in your comment.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={submitFeedback}
                disabled={rating === null}
                className={`${primaryButtonBase} px-4 py-2 text-sm`}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`${secondaryButtonBase} px-4 py-2 text-sm`}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
