import React, { useState } from 'react';

const ErrorBlock = ({ children }) => {
    return (
        <span className="text-sm text-red-600 font-Nunito">{children}</span>
    )
}
export default ErrorBlock;