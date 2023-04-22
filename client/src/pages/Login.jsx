import { useState, useEffect } from "react";
import { useAuthContext } from "../context";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import googleLogo from "../icons/google.svg";

export const Login = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const { user, loading, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    if (user) {
      return history.push("/");
    }
  }, [user, history]);

  async function handleOnClick() {
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (e) {
      setError("Something went wrong");
    }
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Background} />
      <div className={styles.LoginModal}>
        <h1 className={styles.Heading}>Welcome To ParkEase</h1>
        <button
          disabled={loading}
          onClick={handleOnClick}
          className={styles.LoginBtn}
        >
          <img src={googleLogo} alt="Google Logo" className={styles.Logo} />{" "}
          Login With Google
        </button>
        {error && error}
      </div>
    </div>
  );
};
