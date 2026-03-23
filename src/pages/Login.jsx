import { useState } from "react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const TABS = ["email", "phone"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-wrap {
    min-height: 100vh;
    background: #f7f7f6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'Sora', sans-serif;
  }
  .lg-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    padding: 2.25rem 2rem 2rem;
    width: 100%;
    max-width: 430px;
    animation: fadeUp 0.3s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lg-wordmark {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #111;
    text-transform: uppercase;
    margin-bottom: 1.75rem;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .lg-wordmark-dot { width: 7px; height: 7px; background: #111; border-radius: 50%; }

  .lg-title {
    font-size: 21px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.35px;
    margin-bottom: 3px;
  }
  .lg-sub { font-size: 13px; color: #999; margin-bottom: 1.75rem; }
  .lg-sub a { color: #111; font-weight: 500; text-decoration: none; border-bottom: 1px solid #ddd; }
  .lg-sub a:hover { border-color: #111; }

  .lg-oauth { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 1.2rem; }
  .lg-oauth-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 38px;
    border: 1px solid #e5e5e5; border-radius: 9px;
    background: #fff;
    font-size: 13px; font-weight: 500; color: #333;
    cursor: pointer; font-family: 'Sora', sans-serif;
    transition: background 0.13s, border-color 0.13s;
  }
  .lg-oauth-btn:hover { background: #f5f5f4; border-color: #ccc; }

  .lg-divider {
    display: flex; align-items: center; gap: 10px;
    font-size: 11.5px; color: #ccc;
    margin: 1.2rem 0;
  }
  .lg-divider-line { flex: 1; height: 1px; background: #ebebeb; }

  .lg-tabs {
    display: flex;
    border: 1px solid #e8e8e8; border-radius: 9px;
    padding: 3px; background: #f7f7f6;
    margin-bottom: 1.1rem;
  }
  .lg-tab {
    flex: 1; height: 30px;
    border: none; border-radius: 7px;
    background: transparent;
    font-size: 13px; font-weight: 500; color: #aaa;
    cursor: pointer; font-family: 'Sora', sans-serif;
    transition: background 0.13s, color 0.13s;
  }
  .lg-tab.active { background: #fff; color: #111; box-shadow: 0 1px 3px rgba(0,0,0,0.07); }

  .lg-field { margin-bottom: 0.8rem; }
  .lg-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .lg-label { font-size: 12px; font-weight: 500; color: #666; }
  .lg-forgot { font-size: 12px; color: #999; text-decoration: none; border-bottom: 1px solid transparent; transition: color 0.13s, border-color 0.13s; }
  .lg-forgot:hover { color: #111; border-color: #ddd; }

  .lg-input-wrap { position: relative; }
  .lg-input {
    width: 100%; height: 39px; padding: 0 12px;
    border: 1px solid #e5e5e5; border-radius: 9px;
    font-size: 13.5px; font-family: 'Sora', sans-serif; color: #111;
    background: #fff; outline: none;
    transition: border-color 0.13s;
  }
  .lg-input:focus { border-color: #111; }
  .lg-input.err { border-color: #fca5a5; background: #fff9f9; }
  .lg-input.pw { padding-right: 38px; }
  .lg-eye {
    position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #c0c0c0;
    display: flex; padding: 2px; transition: color 0.13s;
  }
  .lg-eye:hover { color: #555; }
  .lg-err { font-size: 11px; color: #ef4444; margin-top: 4px; }

  .lg-remember {
    display: flex; align-items: center; gap: 8px;
    margin: 1rem 0 1.2rem; cursor: pointer;
  }
  .lg-remember input[type=checkbox] { width: 15px; height: 15px; accent-color: #111; cursor: pointer; flex-shrink: 0; }
  .lg-remember-label { font-size: 12px; color: #888; }

  .lg-submit {
    width: 100%; height: 41px;
    background: #111; color: #fff;
    border: none; border-radius: 9px;
    font-size: 13.5px; font-weight: 600; font-family: 'Sora', sans-serif;
    cursor: pointer; letter-spacing: -0.1px;
    transition: opacity 0.13s, transform 0.1s;
  }
  .lg-submit:hover { opacity: 0.85; }
  .lg-submit:active { transform: scale(0.988); }

  .lg-footer { text-align: center; font-size: 12px; color: #bbb; margin-top: 1rem; }
  .lg-footer a { color: #111; font-weight: 500; text-decoration: none; }
  .lg-footer a:hover { text-decoration: underline; }

  .lg-alert {
    background: #fff3f3; border: 1px solid #fecaca;
    border-radius: 9px; padding: 10px 13px;
    font-size: 12.5px; color: #b91c1c;
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
  }

  .lg-success { text-align: center; padding: 1.5rem 0 0.5rem; }
  .lg-success-ring {
    width: 52px; height: 52px; border-radius: 50%;
    border: 1.5px solid #111;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.2rem; color: #111;
  }
  .lg-success h2 { font-size: 19px; font-weight: 600; color: #111; margin-bottom: 6px; }
  .lg-success p { font-size: 13px; color: #888; line-height: 1.65; }

  /* forgot password view */
  .lg-back-btn {
    display: flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    font-size: 12.5px; font-weight: 500; color: #999;
    font-family: 'Sora', sans-serif;
    margin-bottom: 1.75rem; padding: 0;
    transition: color 0.13s;
  }
  .lg-back-btn:hover { color: #111; }
  .lg-reset-sent {
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 9px; padding: 12px 14px;
    font-size: 12.5px; color: #15803d; line-height: 1.6;
  }
`;

export default function Login() {
  const [tab, setTab] = useState("email");
  const [view, setView] = useState("login"); // "login" | "forgot" | "done"
  const [form, setForm] = useState({ identifier: "", password: "", remember: false });
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
    setErrors((er) => ({ ...er, [k]: "" }));
    setAuthError("");
  };

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) {
      e.identifier = tab === "email" ? "Email is required" : "Phone number is required";
    } else if (tab === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identifier)) {
      e.identifier = "Enter a valid email";
    } else if (tab === "phone" && !/^\+?[\d\s\-()]{7,15}$/.test(form.identifier)) {
      e.identifier = "Enter a valid phone number";
    }
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Simulate wrong credentials for demo (replace with real auth call)
    if (form.password === "wrongpass") {
      setAuthError("Incorrect email or password. Please try again.");
      return;
    }
    setView("done");
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      setErrors({ resetEmail: "Enter a valid email" });
      return;
    }
    setResetSent(true);
  };

  if (view === "done") return (
    <>
      <style>{css}</style>
      <div className="lg-wrap">
        <div className="lg-card">
          <div className="lg-success">
            <div className="lg-success-ring">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Welcome back</h2>
            <p>You've signed in successfully.<br/>Redirecting you now…</p>
          </div>
        </div>
      </div>
    </>
  );

  if (view === "forgot") return (
    <>
      <style>{css}</style>
      <div className="lg-wrap">
        <div className="lg-card">
          <div className="lg-wordmark">
            <span className="lg-wordmark-dot" />
            Auth
          </div>

          <button className="lg-back-btn" onClick={() => { setView("login"); setResetSent(false); setErrors({}); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to sign in
          </button>

          <h1 className="lg-title">Reset password</h1>
          <p className="lg-sub" style={{ marginBottom: "1.5rem" }}>
            Enter your email and we'll send you a reset link.
          </p>

          {resetSent ? (
            <div className="lg-reset-sent">
              Check your inbox — a reset link has been sent to <strong>{resetEmail}</strong>.
            </div>
          ) : (
            <form onSubmit={handleReset} noValidate>
              <div className="lg-field">
                <label className="lg-label" htmlFor="resetEmail">Email address</label>
                <input
                  id="resetEmail"
                  type="email"
                  className={`lg-input${errors.resetEmail ? " err" : ""}`}
                  placeholder="jane@example.com"
                  value={resetEmail}
                  onChange={(e) => { setResetEmail(e.target.value); setErrors({}); }}
                  autoComplete="email"
                />
                {errors.resetEmail && <p className="lg-err">{errors.resetEmail}</p>}
              </div>
              <button type="submit" className="lg-submit" style={{ marginTop: "0.4rem" }}>
                Send reset link
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="lg-wrap">
        <div className="lg-card">
          <div className="lg-wordmark">
            <span className="lg-wordmark-dot" />
            Auth
          </div>

          <h1 className="lg-title">Welcome back</h1>
          <p className="lg-sub">
            Don't have an account? <a href="#">Sign up</a>
          </p>

          <div className="lg-oauth">
            <button className="lg-oauth-btn" type="button"><GoogleIcon /> Google</button>
            <button className="lg-oauth-btn" type="button"><GitHubIcon /> GitHub</button>
          </div>

          <div className="lg-divider">
            <span className="lg-divider-line" />
            <span>or</span>
            <span className="lg-divider-line" />
          </div>

          <div className="lg-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`lg-tab${tab === t ? " active" : ""}`}
                onClick={() => { setTab(t); setErrors({}); setAuthError(""); setForm(f => ({ ...f, identifier: "" })); }}
              >
                {t === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          {authError && (
            <div className="lg-alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="lg-field">
              <label className="lg-label" htmlFor="identifier">
                {tab === "email" ? "Email address" : "Phone number"}
              </label>
              <input
                id="identifier"
                type={tab === "email" ? "email" : "tel"}
                className={`lg-input${errors.identifier ? " err" : ""}`}
                placeholder={tab === "email" ? "jane@example.com" : "+1 555 000 0000"}
                value={form.identifier}
                onChange={set("identifier")}
                autoComplete={tab === "email" ? "email" : "tel"}
              />
              {errors.identifier && <p className="lg-err">{errors.identifier}</p>}
            </div>

            <div className="lg-field">
              <div className="lg-label-row">
                <label className="lg-label" htmlFor="password">Password</label>
                <a href="#" className="lg-forgot" onClick={(e) => { e.preventDefault(); setView("forgot"); }}>
                  Forgot password?
                </a>
              </div>
              <div className="lg-input-wrap">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  className={`lg-input pw${errors.password ? " err" : ""}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set("password")}
                  autoComplete="current-password"
                />
                <button type="button" className="lg-eye" onClick={() => setShowPw(v => !v)}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {errors.password && <p className="lg-err">{errors.password}</p>}
            </div>

            <label className="lg-remember">
              <input type="checkbox" checked={form.remember} onChange={set("remember")} />
              <span className="lg-remember-label">Keep me signed in</span>
            </label>

            <button type="submit" className="lg-submit">Sign in</button>
          </form>

          <p className="lg-footer">
            Don't have an account? <a href="#">Create one</a>
          </p>
        </div>
      </div>
    </>
  );
}