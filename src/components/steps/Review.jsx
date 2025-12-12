import React from "react";

export default function Review({ values, jumpToStep }) {
  return (
    <section aria-labelledby="reviewHeading">
      <h3 id="reviewHeading" className="text-lg font-semibold mb-3">Review & Submit</h3>

      <div className="mb-3 p-3 rounded-lg bg-white border">
        <div className="flex justify-between items-center">
          <strong>Personal</strong>
          <button type="button" className="btn-ghost" onClick={() => jumpToStep(0)}>Edit</button>
        </div>
        <div className="mt-2 text-sm text-slate-700">
          <div><strong>Name:</strong> {values.firstName} {values.lastName}</div>
          <div><strong>Email:</strong> {values.email}</div>
          <div><strong>Phone:</strong> {values.phone}</div>
        </div>
      </div>

      <div className="mb-3 p-3 rounded-lg bg-white border">
        <div className="flex justify-between items-center">
          <strong>Address</strong>
          <button type="button" className="btn-ghost" onClick={() => jumpToStep(1)}>Edit</button>
        </div>
        <div className="mt-2 text-sm text-slate-700">
          <div>{values.address}</div>
          <div>{values.city}, {values.state} {values.zip}</div>
          <div>{values.country}</div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border">
        <div className="flex justify-between items-center">
          <strong>Account</strong>
          <button type="button" className="btn-ghost" onClick={() => jumpToStep(2)}>Edit</button>
        </div>
        <div className="mt-2 text-sm text-slate-700">
          <div><strong>Username:</strong> {values.username}</div>
        </div>
      </div>
    </section>
  );
}
