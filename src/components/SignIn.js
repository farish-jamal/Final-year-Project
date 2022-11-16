import React from "react";
import firebase from 'firebase/compat/app';
import {auth} from "../firebase"
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
        height: "95vh",
        alignItems: "center",
      }}
    >
      <button
        style={{
          padding: "10px 15px",
          fontSize: "18px",
          borderRadius: "20px",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        variant="contained"
        color="primary"
        onClick={signInWithGoogle}
      >
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"  style={{"width": "35px", "marginRight": "5px"}}/>
        Login With Google
      </button>
    </div>
  );
}

export default SignIn;