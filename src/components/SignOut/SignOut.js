import React from 'react';
import { auth } from '../../firebase';

const SignOut = () => {
    return (
        <div>
            <button className="btn submitBtn" onClick={() => auth.signOut()}>Sign out</button>
        </div>
    );
};

export default SignOut;