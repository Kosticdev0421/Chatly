import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const displayName = displayNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordRef.current.value;
        console.log(displayName, email, password, passwordConfirm);
    }

    return (
        <div>
            <h2 className="title-text">Sign up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" placeholder="username" required ref={displayNameRef} />
                <input type="email" placeholder="Email" required ref={emailRef} />
                <input type="password" placeholder="Password" required ref={passwordRef} />
                <input
                    type="password"
                    placeholder="confirm password"
                    required
                    ref={passwordConfirmRef}
                />
                <button className="btn submitBtn">Submit</button>
            </form>
            <small>
                Already have an account?
                <Link to="/">Log in here!</Link>
            </small>
        </div>
    );
};

export default SignUp;