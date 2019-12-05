import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Button, Paper, TextField, MenuItem } from '@material-ui/core';
import API from './API';

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

class PostModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentItemName: '',
            askingGold: 0,
            description: '',
            isSelling: true
        };
        this.createPost = this.createPost.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async createPost() {
        console.log(this.props.items.find((el) => el.itemName === this.state.currentItemName))
        let body = {
            userID: this.props.currentUserId,
            itemID: this.props.items.find((el) => el.itemName === this.state.currentItemName).itemID,
            postText: this.state.description,
            goldCost: parseInt(this.state.askingGold),
            isSelling: this.state.isSelling
        }
        console.log(body);
        try {
            await API.post('posts/', body);
            this.props.reloadPosts();
            this.props.handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    onClose() {
        this.setState({
            currentItemName: '',
            askingGold: '',
            description: '',
            isSelling: true
        });
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.onClose}>
                    <Paper className={this.props.classes.paper}>
                        <h2>Create New Post</h2>
                        <div className='modal-options'>
                            <TextField
                                select
                                label="Select Item Names"
                                className={this.props.classes.dropdown}
                                value={this.state.currentItemName}
                                onChange={(event) => this.setState({currentItemName: event.target.value})}
                                SelectProps={{
                                    MenuProps: {
                                        className: this.props.classes.menu,
                                    }
                                }}
                                margin="normal"
                                variant="outlined"
                                >
                                {this.props.items.map(option => (
                                    <MenuItem key={option.itemID} value={option.itemName}>
                                        {option.itemName}
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
                            value={this.state.description}
                            className={this.props.classes.textField}
                            onChange={(e) => this.setState({description: e.target.value})}
                            margin="normal"
                            variant="outlined" />
                        <div className='modal-buttons'>
                            <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.props.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.createPost}>
                                Create
                            </Button>
                        </div>
                    </Paper>
            </Modal>
        );
    }
}

export default withStyles(styles)(PostModal);
