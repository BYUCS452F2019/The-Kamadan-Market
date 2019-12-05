import React from 'react';
import API from './API';
import { withStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Divider, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PostModal from './PostModal';
import Post from './Post';

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
            posts: [],
            searchValue: '',
            items: [],
            modal: {
                open: false,
                isSelling: true,
                askingGold: 0,
                description: '',
                itemName: '',
                editing: false
            },
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.search = this.search.bind(this);
        this.viewMyPosts = this.viewMyPosts.bind(this);
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        this.getItems();
    }

    async getPosts() {
        try {
            const {data} = await API.get('posts/');
            console.log('Posts: ', data);
            this.setState({posts: data});
        } catch (ex) {
            console.error(ex);
        }
    }

    async getItems() {
        try {
            const {data} = await API.get('items/');
            this.setState({items: data});
        } catch (ex) {
            console.log(ex);
        }
    }

    async search() {
        try {
            const {data} = await API.get(`posts?keyWords=${this.state.searchValue}`);
            this.setState({posts: data});
        } catch (ex) {
            console.log(ex);
        }
    }

    handleModalClose() {
        this.setState({
            modal: {
                open: false,
                isSelling: true,
                askingGold: 0,
                description: '',
                itemName: '',
                editing: false
            }
        });
    }

    createPost() {
        this.setState({
            modal: {
                open: true,
                isSelling: true,
                askingGold: 0,
                description: '',
                itemName: '',
                editing: false
            }
        });
    }

    editPost(post) {
        this.setState({
            modal: {
                open: true,
                isSelling: post.isSelling,
                askingGold: post.askingGold,
                description: post.postText,
                itemName: post.itemName,
                editing: true
            }
        });
    }

    async viewMyPosts() {
        try {
            const {data} = await API.get('/posts/' + this.props.user.userID)
            this.setState({posts: data})
        } catch(ex) {
            console.error(ex)
        }
    }

    render() {
        return (
            <div className='main-page'>
                <Paper className={this.props.classes.searchBar}>
                    <InputBase
                        className={this.props.classes.searchBarInput}
                        placeholder="Search"
                        onChange={(e) => this.setState({searchValue: e.target.value})}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <Divider className={this.props.classes.searchDivider} orientation="vertical" />
                    <IconButton className={this.props.classes.searchIconButton} aria-label="search" onClick={this.search}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div className='buttons'>
                    <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.createPost}>
                        Create Post
                    </Button>
                    <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.viewMyPosts}>
                        View My Posts
                    </Button>
                </div>
                <div className='posts-container'>
                    {this.state.posts.map(post => <Post key={post._id} {...post} currentUserId={this.state.user.userID} editPost={this.editPost} />)}
                </div>
                <PostModal open={this.state.modalOpen} handleClose={this.handleModalClose} items={this.state.items} reloadPosts={this.getPosts} currentUserId={this.props.user.userID} {...this.state.modal} />
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);