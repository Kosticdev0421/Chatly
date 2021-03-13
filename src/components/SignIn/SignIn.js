import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    function signInUser(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);


        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    return (
        <div>
            <h2 className="title-text">Sign in</h2>
            <form onSubmit={signInUser} className="signup-form">
                <input type="email" placeholder="Email" required ref={emailRef} />
                <input type="password" placeholder="Password" required ref={passwordRef} />

                <button className="btn submitBtn">Submit</button>
            </form>
            <small>
                Don't have an account? <Link to="/signUp">Sign up here!</Link>
            </small>
        </div>
    );
};

export default SignIn;