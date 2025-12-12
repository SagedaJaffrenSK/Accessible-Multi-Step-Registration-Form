const KEY = "gpp_multi_step_form_v1";

export function saveForm(payload) {
  try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch {}
}

export function loadForm() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearForm() {
  try { localStorage.removeItem(KEY); } catch {}
}
