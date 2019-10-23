import React from 'react';
import './App.css';
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
            registerConfirmPassword: ''
        }
    }

    async register() {
        
    }
    
    render() {
        return (
            <div className='login-page'>
                <div className='login-title'>
                    <h1>The Kamadan Market</h1>
                </div>
                <div className='login-content'>
                    <div className='login-form'>
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
                                <Button variant="contained" color="primary">
                                    Log In
                                </Button>
                        </div>
                        </form>
                    </div>
                    <div className='login-form'>
                        <h3>Don't have an account? Sign up!</h3>
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
                                <Button variant="contained" color="primary">
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
