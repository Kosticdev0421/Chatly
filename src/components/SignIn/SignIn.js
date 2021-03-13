import React from 'react';

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);
    }

    return (
        <div>
            <h2 className="title-text">Sign in</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="email" placeholder="Email" required ref={emailRef} />
                <input type="password" placeholder="Password" required ref={passwordRef} />

                <button className="btn submitBtn">Submit</button>
            </form>
            <small>Don't have an account? Sign up here!</small>
        </div>
    );
};

export default SignIn;