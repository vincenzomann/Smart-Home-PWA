import React from 'react';
import { connect } from 'react-redux';

// have to pass in props because it's a functional component not a class
const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <li><a href='/' onClick={props.logout}>Log Out</a></li>
        </ul>
    )
}

export default connect()(SignedInLinks);