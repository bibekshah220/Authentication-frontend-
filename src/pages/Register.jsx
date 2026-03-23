import { useState } from "react";

const TABS = ["email", "phone"];

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

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthMeta = [
  { label: "", color: "#e5e7eb" },
  { label: "Weak", color: "#ef4444" },
  { label: "Fair", color: "#f59e0b" },
  { label: "Good", color: "#3b82f6" },
  { label: "Strong", color: "#10b981" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rg-wrap {
    min-height: 100vh;
    background: #f7f7f6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'Sora', sans-serif;
  }
  .rg-card {
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
  .rg-wordmark {
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
  .rg-wordmark-dot {
    width: 7px; height: 7px;
    background: #111;
    border-radius: 50%;
  }
  .rg-title {
    font-size: 21px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.35px;
    margin-bottom: 3px;
  }
  .rg-sub {
    font-size: 13px;
    color: #999;
    margin-bottom: 1.75rem;
  }
  .rg-sub a { color: #111; font-weight: 500; text-decoration: none; border-bottom: 1px solid #ddd; }
  .rg-sub a:hover { border-color: #111; }

  .rg-oauth { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 1.2rem; }
  .rg-oauth-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 38px;
    border: 1px solid #e5e5e5;
    border-radius: 9px;
    background: #fff;
    font-size: 13px; font-weight: 500; color: #333;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    transition: background 0.13s, border-color 0.13s;
  }
  .rg-oauth-btn:hover { background: #f5f5f4; border-color: #ccc; }

  .rg-divider {
    display: flex; align-items: center; gap: 10px;
    font-size: 11.5px; color: #ccc;
    margin: 1.2rem 0;
  }
  .rg-divider-line { flex: 1; height: 1px; background: #ebebeb; }

  .rg-tabs {
    display: flex;
    border: 1px solid #e8e8e8;
    border-radius: 9px;
    padding: 3px;
    background: #f7f7f6;
    margin-bottom: 1.1rem;
  }
  .rg-tab {
    flex: 1; height: 30px;
    border: none; border-radius: 7px;
    background: transparent;
    font-size: 13px; font-weight: 500; color: #aaa;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    transition: background 0.13s, color 0.13s;
  }
  .rg-tab.active { background: #fff; color: #111; box-shadow: 0 1px 3px rgba(0,0,0,0.07); }

  .rg-field { margin-bottom: 0.8rem; }
  .rg-label { display: block; font-size: 12px; font-weight: 500; color: #666; margin-bottom: 5px; }
  .rg-input-wrap { position: relative; }
  .rg-input {
    width: 100%; height: 39px; padding: 0 12px;
    border: 1px solid #e5e5e5; border-radius: 9px;
    font-size: 13.5px; font-family: 'Sora', sans-serif; color: #111;
    background: #fff; outline: none;
    transition: border-color 0.13s;
  }
  .rg-input:focus { border-color: #111; }
  .rg-input.err { border-color: #fca5a5; background: #fff9f9; }
  .rg-input.pw { padding-right: 38px; }
  .rg-eye {
    position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #c0c0c0;
    display: flex; padding: 2px;
    transition: color 0.13s;
  }
  .rg-eye:hover { color: #555; }
  .rg-err { font-size: 11px; color: #ef4444; margin-top: 4px; }

  .rg-strength { margin-top: 6px; }
  .rg-strength-bars { display: flex; gap: 3px; }
  .rg-strength-bar { height: 2px; flex: 1; border-radius: 99px; transition: background 0.2s; }
  .rg-strength-label { font-size: 10.5px; margin-top: 3px; }

  .rg-check { display: flex; align-items: flex-start; gap: 9px; margin: 1rem 0 1.2rem; cursor: pointer; }
  .rg-check input[type=checkbox] { width: 15px; height: 15px; margin-top: 2px; accent-color: #111; cursor: pointer; flex-shrink: 0; }
  .rg-check-text { font-size: 12px; color: #888; line-height: 1.6; }
  .rg-check-text a { color: #333; text-decoration: underline; text-underline-offset: 2px; }
  .rg-check-err { font-size: 11px; color: #ef4444; margin: -8px 0 10px 24px; }

  .rg-submit {
    width: 100%; height: 41px;
    background: #111; color: #fff;
    border: none; border-radius: 9px;
    font-size: 13.5px; font-weight: 600; font-family: 'Sora', sans-serif;
    cursor: pointer; letter-spacing: -0.1px;
    transition: opacity 0.13s, transform 0.1s;
  }
  .rg-submit:hover { opacity: 0.85; }
  .rg-submit:active { transform: scale(0.988); }

  .rg-footer { text-align: center; font-size: 12px; color: #bbb; margin-top: 1rem; }
  .rg-footer a { color: #111; font-weight: 500; text-decoration: none; }
  .rg-footer a:hover { text-decoration: underline; }

  .rg-success { text-align: center; padding: 1.5rem 0 0.5rem; }
  .rg-success-ring {
    width: 52px; height: 52px; border-radius: 50%;
    border: 1.5px solid #111;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.2rem; color: #111;
  }
  .rg-success h2 { font-size: 19px; font-weight: 600; color: #111; margin-bottom: 6px; }
  .rg-success p { font-size: 13px; color: #888; line-height: 1.65; }
`;

export default function Register() {
  const [tab, setTab] = useState("email");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", agree: false });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (tab === "email") {
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    } else {
      if (!form.phone.trim()) e.phone = "Phone number is required";
      else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    }
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    if (!form.agree) e.agree = true;
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  };

  const strength = getStrength(form.password);
  const sm = strengthMeta[strength];

  if (done) return (
    <>
      <style>{css}</style>
      <div className="rg-wrap">
        <div className="rg-card">
          <div className="rg-success">
            <div className="rg-success-ring">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Account created</h2>
            <p>
              Welcome, {form.name.split(" ")[0]}!<br/>
              Check your {tab === "email" ? "inbox" : "phone"} to verify your account.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="rg-wrap">
        <div className="rg-card">
          <div className="rg-wordmark">
            <span className="rg-wordmark-dot" />
            Auth
          </div>

          <h1 className="rg-title">Create an account</h1>
          <p className="rg-sub">
            Already have one? <a href="#">Sign in</a>
          </p>

          <div className="rg-oauth">
            <button className="rg-oauth-btn" type="button"><GoogleIcon /> Google</button>
            <button className="rg-oauth-btn" type="button"><GitHubIcon /> GitHub</button>
          </div>

          <div className="rg-divider">
            <span className="rg-divider-line" />
            <span>or</span>
            <span className="rg-divider-line" />
          </div>

          <div className="rg-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`rg-tab${tab === t ? " active" : ""}`}
                onClick={() => { setTab(t); setErrors({}); }}
              >
                {t === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="rg-field">
              <label className="rg-label" htmlFor="name">Full name</label>
              <input
                id="name"
                className={`rg-input${errors.name ? " err" : ""}`}
                placeholder="Jane Doe"
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
              />
              {errors.name && <p className="rg-err">{errors.name}</p>}
            </div>

            {tab === "email" ? (
              <div className="rg-field">
                <label className="rg-label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  className={`rg-input${errors.email ? " err" : ""}`}
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
                {errors.email && <p className="rg-err">{errors.email}</p>}
              </div>
            ) : (
              <div className="rg-field">
                <label className="rg-label" htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  className={`rg-input${errors.phone ? " err" : ""}`}
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
                {errors.phone && <p className="rg-err">{errors.phone}</p>}
              </div>
            )}

            <div className="rg-field">
              <label className="rg-label" htmlFor="password">Password</label>
              <div className="rg-input-wrap">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  className={`rg-input pw${errors.password ? " err" : ""}`}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={set("password")}
                  autoComplete="new-password"
                />
                <button type="button" className="rg-eye" onClick={() => setShowPw(v => !v)}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {form.password && (
                <div className="rg-strength">
                  <div className="rg-strength-bars">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="rg-strength-bar" style={{ background: strength >= i ? sm.color : "#e5e7eb" }} />
                    ))}
                  </div>
                  {sm.label && <p className="rg-strength-label" style={{ color: sm.color }}>{sm.label}</p>}
                </div>
              )}
              {errors.password && <p className="rg-err">{errors.password}</p>}
            </div>

            <div className="rg-field">
              <label className="rg-label" htmlFor="confirm">Confirm password</label>
              <div className="rg-input-wrap">
                <input
                  id="confirm"
                  type={showCf ? "text" : "password"}
                  className={`rg-input pw${errors.confirm ? " err" : ""}`}
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={set("confirm")}
                  autoComplete="new-password"
                />
                <button type="button" className="rg-eye" onClick={() => setShowCf(v => !v)}>
                  <EyeIcon open={showCf} />
                </button>
              </div>
              {errors.confirm && <p className="rg-err">{errors.confirm}</p>}
            </div>

            <label className="rg-check">
              <input type="checkbox" checked={form.agree} onChange={set("agree")} />
              <span className="rg-check-text">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </span>
            </label>
            {errors.agree && <p className="rg-check-err">You must accept to continue</p>}

            <button type="submit" className="rg-submit">Create account</button>
          </form>

          <p className="rg-footer">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}