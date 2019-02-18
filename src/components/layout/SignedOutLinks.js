import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="open">
            <li><NavLink to='/signup'>Sign Up</NavLink></li>
            <li><NavLink to='/login'>Log In</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;