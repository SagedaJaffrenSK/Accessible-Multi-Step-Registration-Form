import React from "react";

/**
 * Field component using react-hook-form register properly.
 * - register must be passed from useForm.
 * - refForFirst: if true, the input will focus when mounted (used on step change).
 */
export default function Field({ name, label, type = "text", register, error, onBlur, refForFirst = false }) {
  const id = `field_${name}`;
  const { ref, ...inputProps } = register(name);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        {...inputProps}
        onBlur={onBlur}
        ref={(el) => {
          ref(el);
          if (refForFirst && el) el.focus();
        }}
        className="input-material"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="text-sm mt-1 text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
