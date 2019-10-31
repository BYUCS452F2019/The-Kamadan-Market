import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import moment from 'moment';

const styles = {
    paper: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
        marginBottom: 10
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
                <div className='post-subtitle'>{this.props.typeName}</div>
                <p className='post-description'>{this.props.postText}</p>
                <div className='post-footer'>
                    <div className='post-gamertag'>{this.props.gamertag}</div>
                    <div className='post-gold-cost'>Gold cost: {this.props.goldCost}</div>
                    <div className='post-date'>{moment(this.props.time).fromNow()}</div>
                </div>
            </Paper>           
        );
    }
}

export default withStyles(styles)(Post);
