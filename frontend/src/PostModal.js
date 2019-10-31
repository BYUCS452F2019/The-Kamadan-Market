import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Button, Paper, TextField, MenuItem } from '@material-ui/core';

const styles = {
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 700,
        textAlign: 'center',
        padding: 15
    },
    dropdown: {
        width: '30%',
        margin: 10,
        textAlign: 'left'
    },
    textField: {
        width: '96%'
    },
    menu: {
        width: 200,
    },
    button: {
        margin: 5
    }
};

const itemTypes = [
   'Sword',
   'Shield',
   'Armor',
   'Bow',
   'Staff',
   'Helmet'
];

class PostModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentItemType: '',
            isSelling: true,
            askingGold: 0
        };
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}>
                    <Paper className={this.props.classes.paper}>
                        <h2>Create New Post</h2>
                        <div className='modal-options'>
                            <TextField
                                select
                                label="Select Item Type"
                                className={this.props.classes.dropdown}
                                value={this.state.currentItemType}
                                onChange={(event) => this.setState({currentItemType: event.target.value})}
                                SelectProps={{
                                    MenuProps: {
                                        className: this.props.classes.menu,
                                    }
                                }}
                                margin="normal"
                                variant="outlined"
                                >
                                {itemTypes.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                className={this.props.classes.dropdown}
                                value={this.state.isSelling ? 'Sell' : 'Buy'}
                                onChange={(event) => this.setState({isSelling: event.target.value === 'Sell'})}
                                SelectProps={{
                                    MenuProps: {
                                        className: this.props.classes.menu,
                                    }
                                }}
                                margin="normal"
                                variant="outlined"
                                >
                                <MenuItem value='Sell'>
                                    Sell
                                </MenuItem>
                                <MenuItem value='Buy'>
                                    Buy
                                </MenuItem>
                            </TextField>
                            <TextField
                                className={this.props.classes.dropdown}
                                value={this.state.askingGold}
                                onChange={(event) => this.setState({askingGold: event.target.value})}
                                margin="normal"
                                label='Asking Gold'
                                variant="outlined"
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1,
                                }} />
                        </div>
                        <TextField
                            label="Description"
                            multiline
                            rows="4"
                            className={this.props.classes.textField}
                            margin="normal"
                            variant="outlined" />
                        <div className='modal-buttons'>
                            <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.props.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" className={this.props.classes.button}>
                                Create
                            </Button>
                        </div>
                    </Paper>
            </Modal>
        );
    }
}

export default withStyles(styles)(PostModal);
