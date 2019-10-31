import React from 'react';
import API from './API';
import { withStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Divider, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PostModal from './PostModal';
import Post from './Post';
import moment from 'moment';

const styles = {
    searchBar: {
        padding: '2px 10px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    searchBarInput: {
        marginLeft: 10,
        flex: 1,
    },
    searchIconButton: {
        padding: 10,
    },
    searchDivider: {
        height: 28,
        margin: 4,
    },
    button: {
        margin: '20px 10px 20px 10px',
        minWidth: '40%'
    }
};

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            posts: [
                {
                    postID: '1',
                    userID: '8',
                    gamertag: 'dspence',
                    itemName: 'Sword of Destiny',
                    itemType: 'Sword',
                    description: 'Bacon ipsum dolor amet ut salami officia deserunt. Aute beef ribs culpa cow esse ipsum. Aute ribeye lorem corned beef short loin mollit. Anim reprehenderit strip steak, ea pork enim cupidatat bresaola pariatur adipisicing.',
                    isSelling: true,
                    time:  moment(),
                    goldCost: 100
                }
            ],
            modalOpen: false
        };
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.setState({modalOpen: false})
    }

    render() {
        return (
            <div className='main-page'>
                <Paper className={this.props.classes.searchBar}>
                    <InputBase
                        className={this.props.classes.searchBarInput}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <Divider className={this.props.classes.searchDivider} orientation="vertical" />
                    <IconButton className={this.props.classes.searchIconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div className='buttons'>
                    <Button variant="contained" color="primary" className={this.props.classes.button} onClick={() => this.setState({modalOpen: true})}>
                        Create Post
                    </Button>
                    <Button variant="contained" color="primary" className={this.props.classes.button}>
                        View My Posts
                    </Button>
                </div>
                <div className='posts-container'>
                    {this.state.posts.map(post => <Post key={post.postID} {...post} />)}
                </div>
                <PostModal open={this.state.modalOpen} handleClose={this.handleModalClose} />
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);