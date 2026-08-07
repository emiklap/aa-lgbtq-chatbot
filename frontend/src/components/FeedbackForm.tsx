import { useState } from "react";
import type { FeedbackRequest } from "../types/api";

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
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 8,
          padding: 24,
          width: 320,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        {submitted ? (
          <>
            <h2 id="feedback-form-heading" style={{ fontSize: 18, marginBottom: 12 }}>
              Thank you for your feedback
            </h2>
            <button type="button" onClick={onClose} style={{ cursor: "pointer" }}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2 id="feedback-form-heading" style={{ fontSize: 18, marginBottom: 12 }}>
              Feedback
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} out of 5`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(null)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: "white",
                    cursor: "pointer",
                    fontSize: 20,
                    lineHeight: "1",
                    color: "#333",
                  }}
                >
                  {value <= (hoverRating ?? rating ?? 0) ? "★" : "☆"}
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              placeholder="Optional comment"
              style={{ width: "100%", minHeight: 80, padding: 8, marginBottom: 8, fontFamily: "inherit" }}
            />
            <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
              Please don't include personal details in your comment.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={submitFeedback} disabled={rating === null} style={{ cursor: "pointer" }}>
                Submit
              </button>
              <button type="button" onClick={onClose} style={{ cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
