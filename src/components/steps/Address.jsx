import React from "react";
import Field from "../ui/Field";

export default function Address({ register, errors, onBlur }) {
  return (
    <section aria-labelledby="addressHeading">
      <h3 id="addressHeading" className="text-lg font-semibold mb-3">Address</h3>

      <Field name="address" label="Street address" register={register} error={errors.address} onBlur={onBlur} />

      <div className="flex gap-4">
        <div className="flex-1">
          <Field name="city" label="City" register={register} error={errors.city} onBlur={onBlur} />
        </div>
        <div className="flex-1">
          <Field name="state" label="State / Province" register={register} error={errors.state} onBlur={onBlur} />
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="flex-1">
          <Field name="zip" label="ZIP / Postal code" register={register} error={errors.zip} onBlur={onBlur} />
        </div>
        <div style={{ width: 160 }}>
          <Field name="country" label="Country" register={register} error={errors.country} onBlur={onBlur} />
        </div>
      </div>
    </section>
  );
}
