import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

// have to pass in props because it's a functional component not a class
const SignedInLinks = (props) => {

    const handleClick = (e) => {
        props.logout();
    }

    return (
        <ul className="open">
            <li><a href='/' onClick={handleClick}>Log Out</a></li>
            {/* Settings link */}
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);