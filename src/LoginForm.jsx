import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import config from './config.json';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            password: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    componentWillUnmount = () => {
        this.props.clearCache();
    }

    facebookComponentClicked = (e) => {
        console.log('facebookComponentClicked', e);
    }

    responseFacebookCallback = (response) => {
        //const loginKey = `cognito-idp.${config.region}.amazonaws.com/${config.userPool}`;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.identityPool,
            Logins: {
                'graph.facebook.com': response.accessToken
            }
        });

        // Obtain AWS credentials
        AWS.config.credentials.get(function(){
            // Access AWS resources here.
        });
        console.log('responseFacebookCallback', response);
    }

    render = () => (
        <div>
            <FacebookLogin
                appId="2233235413558685"
                autoLoad={true}
                fields="email, name"
                onClick={this.facebookComponentClicked}
                callback={this.responseFacebookCallback}
            />
        <form onSubmit={this.onSubmit}>
            <div>{this.props.error}</div>
            <div>{this.state.email}</div>
            <label>
                Username
                <input placeholder="Username" value={this.state.username} onChange={this.changeUsername} required/>
            </label>
            <label>
                Password
                <input placeholder="Password" onChange={this.changePassword} type="password" required/>
            </label>
            <button type="submit">Sign in</button>

        </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    clearCache: PropTypes.func,
    username: PropTypes.string,
    error: PropTypes.string,
    email: PropTypes.string,
};

export default LoginForm;
