import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './sign-up.module.css';

// '/auth/signup' page
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),  
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth/signin");
      alert(data.message);
    } else {
      alert(data.message || "Error signing up");
    }
    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Username"
            className={styles.usernameField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className={styles.linkContainer}>
        <p className={styles.link}>Already have an account? <Link href="/auth/signin">Sign In</Link></p>
      </div>
    </div>
  );
}
