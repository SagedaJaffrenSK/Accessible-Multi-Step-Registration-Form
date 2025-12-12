import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { schemasByStep, fullSchema } from "./schemas";
import { saveForm, loadForm, clearForm } from "./utils/localStorage";

import PersonalInfo from "./components/steps/PersonalInfo";
import Address from "./components/steps/Address";
import Account from "./components/steps/Account";
import Review from "./components/steps/Review";
import SuccessPage from "./pages/SuccessPage";

import confetti from "canvas-confetti";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Personal Info", "Address", "Account", "Review"];

  // Load saved data but ALWAYS start at step 0
  useEffect(() => {
    const saved = loadForm();
    if (saved?.form) reset(saved.form);
    setStep(0);
  }, []);

  // Persist data
  useEffect(() => {
    const sub = watch((value) => saveForm({ form: value, step }));
    return () => sub && sub.unsubscribe && sub.unsubscribe();
  }, [watch, step]);

  const fieldsByStep = [
    ["firstName", "lastName", "email", "phone", "dob"],
    ["address", "city", "state", "zip", "country"],
    ["username", "password", "confirmPassword"],
  ];

  // ⭐ FIXED FULL VALIDATION (Zod + RHF)
  const validateStep = async () => {
    const fields = fieldsByStep[step];
    const data = getValues();

    // 1) RHF validation
    const rhfValid = await trigger(fields);

    // 2) Zod schema validation
    const schema = schemasByStep[step];
    if (schema) {
      const result = schema.safeParse(data);

      if (!result.success) {
        const flat = result.error.flatten().fieldErrors;

        Object.entries(flat).forEach(([field, msg]) => {
          setError(field, { message: msg[0] });
        });

        // Focus first invalid field
        const first = Object.keys(flat)[0];
        const el = document.querySelector(`[name="${first}"]`);
        if (el) el.focus();

        return false;
      }
    }

    return rhfValid;
  };

  const next = async () => {
    const ok = await validateStep();
    if (ok) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data) => {
    const result = fullSchema.safeParse(data);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      Object.entries(flat).forEach(([key, msg]) =>
        setError(key, { message: msg[0] })
      );
      return;
    }

    clearForm();
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });

    setSubmitted(true);
  };

  if (submitted) {
  return (
    <SuccessPage
      name={getValues().firstName}
      onRestart={() => {
        clearForm();
        reset();       
        setStep(0);     // IMPORTANT — go back to step 0
        setSubmitted(false);
      }}
    />
  );
}


  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Accessible Multi-Step Registration
        </h1>

        {/* Step Circles */}
        <div className="relative flex justify-between items-center mb-12 px-6">
          <div className="absolute left-12 right-12 top-7 h-[3px] bg-gray-200"></div>

          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full border-4 bg-white text-lg font-semibold transition-all
                ${
                  step === i
                    ? "border-blue-500 text-blue-600 shadow-lg scale-110"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <p className="mt-2 text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && <PersonalInfo register={register} errors={errors} />}
          {step === 1 && <Address register={register} errors={errors} />}
          {step === 2 && <Account register={register} errors={errors} />}
          {step === 3 && <Review values={getValues()} jumpToStep={setStep} />}

          {/* BUTTONS */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition disabled:opacity-40"
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-semibold shadow-md hover:bg-green-600 transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
