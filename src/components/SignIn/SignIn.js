import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import Loading from '../Loading/Loading';
import ShowError from '../ShowError/ShowError';

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);


    return (
        <div>
            { loading && <Loading />}
            <h2 className="title-text">Sign in</h2>
            {errorMessage && <ShowError errorMessage={errorMessage} />}

            <SignInForm />
            
            <small>
                Don't have an account? <Link to="/signUp">Sign up here!</Link>
            </small>
        </div>
    );

    async function signInUser(e) {
        e.preventDefault();
        setLoading(true);
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);


        await auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                setLoading(false);

                var user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setLoading(false);

                var errorCode = error.code;
                var errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    }
    

    function SignInForm() {
        return (<form onSubmit={signInUser} className="signup-form">
            <input type="email" placeholder="Email" required ref={emailRef} />
            <input type="password" placeholder="Password" required ref={passwordRef} />

            <button className="btn submitBtn">Submit</button>
        </form>)
    }
};

export default SignIn;