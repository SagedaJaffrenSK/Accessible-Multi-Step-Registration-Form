import React from "react";
import Field from "../ui/Field";

export default function PersonalInfo({ register, errors, onBlur }) {
  return (
    <section aria-labelledby="personalHeading">
      <h3 id="personalHeading" className="text-lg font-semibold mb-3">Personal Information</h3>

      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <Field name="firstName" label="First name" register={register} error={errors.firstName} onBlur={onBlur} refForFirst />
        </div>
        <div className="flex-1">
          <Field name="lastName" label="Last name" register={register} error={errors.lastName} onBlur={onBlur} />
        </div>
      </div>

      <Field name="email" label="Email" register={register} error={errors.email} onBlur={onBlur} />
      <div className="flex gap-4">
        <div className="flex-1">
          <Field name="phone" label="Phone" register={register} error={errors.phone} onBlur={onBlur} />
        </div>
        <div style={{ width: 160 }}>
          <Field name="dob" label="Date of birth" type="date" register={register} error={errors.dob} onBlur={onBlur} />
        </div>
      </div>
      <p className="text-sm text-slate-600 mt-2">You must be at least 18 years old.</p>
    </section>
  );
}
