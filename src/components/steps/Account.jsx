export default function Account({ register, errors, onUsernameBlur }) {
  return (
    <div className="space-y-6">

      {/* USERNAME */}
      <div className="field">
        <label className="label">Username</label>
        <input
          type="text"
          className="input-material"
          {...register("username")}
          onBlur={onUsernameBlur}
        />
        {errors.username && (
          <p className="err">{errors.username.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="field">
        <label className="label">Password</label>
        <input
          type="password"
          className="input-material"
          {...register("password")}
        />
        {errors.password && (
          <p className="err">{errors.password.message}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="field">
        <label className="label">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="input-material"
        />

        {errors.confirmPassword && (
          <p className="err">{errors.confirmPassword.message}</p>
        )}
      </div>
    </div>
  );
}
