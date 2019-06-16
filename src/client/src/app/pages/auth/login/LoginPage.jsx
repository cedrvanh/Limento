/*
Import extenal libraries
*/
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/*
Components
*/
import Title from '../../../components/base/title';

import { Auth } from '../../../services';
import { setAuthToken } from '../../../utilities';
import { Link } from '@material-ui/core';
 
/*
Styling
*/
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.onLogin();
  }

  handleFbSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/login/facebook');
  }

  onLogin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    Auth.login(user) 
      .then(res => {
        Auth.setToken(res);
        // setAuthToken(res.token);
        this.props.history.push('/');
      });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <Title type={1}>Log Up</Title>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" value={this.state.email} onChange={this.handleChange} autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={this.handleSubmit}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleFbSubmit}
          >
            Sign in with Facebook
          </Button>
          <Button
            fullWidth
            color="primary"
            className={classes.submit}
            onClick={(e) => { 
              e.preventDefault();
              this.props.history.push('/register')
            }}
          >
            Register an account
          </Button>
        </form>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LoginPage);