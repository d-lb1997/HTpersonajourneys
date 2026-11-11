import { useState, type FormEvent, type ReactNode } from "react";
import logo from "@/assets/hellermanntyton-logo.svg";

// SHA-256 of the password. Only the hash ships with the page, not the plain text.
const PASSWORD_HASH = "41d2e25ae573656137fecde7f6366476a5e9946651ed1ba1b98679f71582454b";
const STORAGE_KEY = "htpersonas-unlocked";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function wasUnlocked() {
  try { return sessionStorage.getItem(STORAGE_KEY) === PASSWORD_HASH; } catch { return false; }
}

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(wasUnlocked);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  async function submit(e: FormEvent) {
    e.preventDefault();
    let hash = "";
    try { hash = await sha256(value); } catch { /* crypto.subtle unavailable (non-secure context) */ }
    if (hash === PASSWORD_HASH) {
      try { sessionStorage.setItem(STORAGE_KEY, PASSWORD_HASH); } catch { /* ignore */ }
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <main className="gate">
      <form className="gate-card" onSubmit={submit}>
        <img src={logo} alt="HellermannTyton" className="gate-logo" />
        <h1 className="gate-title">Welcome to OnePlace</h1>
        <span className="gate-rule" aria-hidden="true" />
        <p className="gate-lede">Please enter the password to continue.</p>
        <label htmlFor="gate-pw" className="gate-sr">Password</label>
        <input
          id="gate-pw"
          className="gate-input"
          type="password"
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          value={value}
          aria-invalid={error}
          aria-describedby={error ? "gate-err" : undefined}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
        />
        {error && <p id="gate-err" className="gate-error" role="alert">Incorrect password. Please try again.</p>}
        <button type="submit" className="gate-btn">Unlock</button>
      </form>
    </main>
  );
}
