import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        console.log(props)
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
                                label='Email'/>
                            <TextField
                                className={this.props.classes.textFieldRight}
                                type='password'
                                label='Password'/>
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
                                    label='First Name'/>
                                <TextField
                                    className={this.props.classes.textFieldRight}
                                    label='Last Name'/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label='Gamertag'/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label='Email'/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    type='password'
                                    label='Password'/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    type='password'
                                    label='Confirm Password'/>
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
