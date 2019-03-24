import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const Navbar = (props) => {

    // initialise auth and profile
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />

    return (
        <div className="navbar">
            <label htmlFor="toggle">  &#9776;  </label>
            <Link to='/' >Smart Home</Link>
            <input type="checkbox" id="toggle"/>
            <div className="nav-menu">
                { links }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);