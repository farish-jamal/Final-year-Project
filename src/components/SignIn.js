import React from "react";
import firebase from 'firebase/compat/app';
import {auth} from "../firebase"
import { Button } from "@material-ui/core";
function SignIn() {
  function signInWithGoogle() {
    // console.log('clicked');
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          padding: "30px",
          fontSize: "20px",
          borderRadius: "20px",
          fontWeight: "600",
        }}
        variant="contained"
        color="primary"
        onClick={signInWithGoogle}
      >
        Login With Google
      </Button>
    </div>
  );
}

export default SignIn;