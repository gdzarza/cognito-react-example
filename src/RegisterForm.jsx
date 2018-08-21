import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { registerUser } from 'react-cognito';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      name: '',
      password: '',
      email: '',
    };
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onSubmit = (event) => {
    const { store } = this.context;
    const state = store.getState();
    const userPool = state.cognito.userPool;
    const config = state.cognito.config;
    event.preventDefault();
    registerUser(userPool, config, this.state.username, this.state.password, {
      email: this.state.email,
      name: this.state.name
    }).then(
      (action) => {
        store.dispatch(action);
        this.props.history.push('/');
      },
      error => this.setState({ error }));
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div>{this.state.error}</div>
      <label>
        Username
        <input placeholder="username" onChange={this.changeUsername} required />
      </label>
      <label>
        Username
        <input placeholder="name" onChange={this.changeName} required />
      </label>
      <label>
        Password
        <input placeholder="password" onChange={this.changePassword} required />
      </label>
      <label>
        Email Address
        <input placeholder="email" type="email" onChange={this.changeEmail} required />
      </label>
      <button type="submit">Register</button>
    </form>
  )
}
RegisterForm.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(RegisterForm);

