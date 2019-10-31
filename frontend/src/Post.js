import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField } from '@material-ui/core';

const styles = {
    paper: {
        width: '100%',
        textAlign: 'left',
        padding: 10
    },
    button: {
        margin: 5
    }
};

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <div className='post-header'>
                    <div className='post-item-name'>{this.props.itemName}</div>
                    <div className='post-buy-or-sell'>{this.props.isSelling ? 'Selling' : 'Buying'}</div>
                </div>
                <div className='post-subtitle'>{this.props.itemType}</div>
                <p className='post-description'>{this.props.description}</p>
                <div className='post-footer'>
                    <div className='post-gamertag'>{this.props.gamertag}</div>
                    <div className='post-date'>{this.props.time.fromNow()}</div>
                </div>
            </Paper>           
        );
    }
}

export default withStyles(styles)(Post);
