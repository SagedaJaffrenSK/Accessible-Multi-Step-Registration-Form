import React from "react";

export default function Stepper({ steps, current, onJump }) {
  return (
    <>
      <div className="flex gap-3 mb-3" role="tablist" aria-label="Form steps">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            className={`step-btn ${i === current ? "bg-primary text-white" : "bg-slate-100 text-slate-800"}`}
            aria-current={i === current ? "step" : undefined}
            aria-label={`Go to ${s}`}
          >
            <span className="text-sm opacity-90">{i + 1}.</span>
            <span className="ml-2 text-sm font-semibold">{s}</span>
          </button>
        ))}
      </div>

      <div className="progressTrack" aria-hidden>
        <div className="progressFill" style={{ width: `${(current / (steps.length - 1)) * 100}%` }} />
      </div>
    </>
  );
}
