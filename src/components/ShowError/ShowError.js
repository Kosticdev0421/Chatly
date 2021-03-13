import React from 'react';
import './ShowError.css';

const ShowError = ({errorMessage}) => {
    return (
        <div className="error-message">
            {errorMessage}
        </div>
    );
};

export default ShowError;