import { useState, useEffect } from "react";
import { signIn , useSession} from "next-auth/react";
import { useRouter } from "next/router";
import styles from './sign-in.module.css';
import Link from "next/link";

// Authentication Sign-In page
export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn("credentials", { redirect: false, email, password });

      if (result?.error) {
        setError(result.error || "Authentication failed");
        return;
      }
      router.push('/');
      

    } catch (err) {
      setError("An unexpected error occurred");
      
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className={styles.linkContainer}>
        <p className={styles.link}>Don't have an account? <Link href="/auth/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
