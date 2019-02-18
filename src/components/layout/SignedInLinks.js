import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

// have to pass in props because it's a functional component not a class
const SignedInLinks = (props) => {

    return (
        <ul className="open">
            <li><a href='/' onClick={props.logout}>Log Out</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);