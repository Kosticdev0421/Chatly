import 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import Loading from '../Loading/Loading';
import ShowError from '../ShowError/ShowError';
import './SignUp.css';

const SignUp = () => {
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    return (
        <div>
            {loading && <Loading />}
            <h2 className="title-text">Sign up</h2>
            {errorMessage && <ShowError errorMessage={errorMessage} />}

            <SignUpForm />

            <small>
                Already have an account?
                <Link to="/">Log in here!</Link>
            </small>
        </div>
    );


    
    async function signUpUser(e) {
        e.preventDefault();
        
        const displayName = displayNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;
        
        
        if(password === passwordConfirm){
            setLoading(true);
            const usersRef = firestore.collection('users');
            const usersInfoRef = firestore.collection('usersInfo');
            
            await auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                setLoading(false);
                // const user = userCredential.user;
                updateProfile(displayName)
                
                usersRef.doc(displayName).set({
                    displayName,
                    email,
                    password,
                    uid: userCredential.user.uid
                });
                usersInfoRef.doc(userCredential.user.uid).set({
                    displayName,
                    rooms: ["5BpeqoIHeR9WCLMnNGui"],
                });

                history.push("/chatRoom");
            })
            .catch((error) => {
                    setLoading(false);
                    
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    setErrorMessage(errorMessage);
                });
            }
        else{
            setErrorMessage("Passwords don't match!");
        }

        function updateProfile(displayName) {
            const user = auth.currentUser;

            user.updateProfile({
                displayName
            })
            .then(function () {
                // Update successful.
            })
            .catch(function (error) {
                // An error happened.
            });

        }
    }

    function SignUpForm() {
        return (
            <form onSubmit={signUpUser} className="signup-form">
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
        );
    }


};

export default SignUp;