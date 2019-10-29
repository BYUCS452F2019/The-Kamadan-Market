import React from 'react';
import './App.css';
import API from './API';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const styles = {
    textFieldLeft: {
        marginRight: '5px'
    },
    textFieldRight: {
        marginLeft: '5px'
    }
};

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: '',
            firstName: '',
            lastName: '',
            gamertag: '',
            registerEmail: '',
            registerPassword: '',
            registerConfirmPassword: '',
            registerErrorMessage: '',
            loginErrorMessage: ''
        }
        this.logIn = this.logIn.bind(this);
        this.register = this.register.bind(this);
    }

    async logIn() {
        try {
            const {data} = await API.post('users/login/', {
                email: this.state.loginEmail,
                password: this.state.loginPassword
            });
            console.log(data);
            this.props.setUser(data);
            this.setState({loginErrorMessage: ''});
        } catch (ex) {
            this.setState({loginErrorMessage: ex.response.data})
            console.dir(ex);
        }
    }

    async register() {
        if (this.state.registerPassword !== this.state.registerConfirmPassword) {
            this.setState({registerErrorMessage: 'Passwords do not match'});
            return;
        }
        try {
            const {data} = await API.post('users/', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gamertag: this.state.gamertag,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            });
            console.log(data);
            this.props.setUser(data);
            this.setState({registerErrorMessage: ''});
        } catch (ex) {
            this.setState({registerErrorMessage: ex.response.data})
            console.dir(ex);
        }
    }
    
    render() {
        return (
            <div className='login-page'>
                <div className='login-title'>
                    <h1>The Kamadan Market</h1>
                </div>
                <div className='login-content'>
                    <div className='login-form'>
                        <div className='login-error-message'>{this.state.loginErrorMessage}</div>
                        <form noValidate autoComplete="off">
                            <TextField
                                className={this.props.classes.textFieldLeft}
                                label='Email'
                                onChange={event => this.setState({loginEmail: event.target.value})}/>
                            <TextField
                                className={this.props.classes.textFieldRight}
                                type='password'
                                label='Password'
                                onChange={event => this.setState({loginPassword: event.target.value})}/>
                            <div className='login-page-button-container'>
                                <Button variant="contained" color="primary" onClick={this.logIn} disabled={!(this.state.loginEmail && this.state.loginPassword)}>
                                    Log In
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className='login-form'>
                        <h3>Don't have an account? Sign up!</h3>
                        <div className='login-error-message'>{this.state.registerErrorMessage}</div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className={this.props.classes.textFieldLeft}
                                    label='First Name'
                                    onChange={event => this.setState({firstName: event.target.value})}/>
                                <TextField
                                    className={this.props.classes.textFieldRight}
                                    label='Last Name'
                                    onChange={event => this.setState({lastName: event.target.value})}/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label='Gamertag'
                                    onChange={event => this.setState({gamertag: event.target.value})}/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label='Email'
                                    onChange={event => this.setState({registerEmail: event.target.value})}/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    type='password'
                                    label='Password'
                                    onChange={event => this.setState({registerPassword: event.target.value})}/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    type='password'
                                    label='Confirm Password'
                                    onChange={event => this.setState({registerConfirmPassword: event.target.value})}/>
                            </div>
                            <div className='login-page-button-container'>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={this.register}
                                    disabled={!(this.state.registerEmail && this.state.firstName && this.state.lastName && this.state.registerPassword && this.state.registerConfirmPassword && this.state.gamertag)}
                                    >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LoginPage);
