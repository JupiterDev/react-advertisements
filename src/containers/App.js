import React, { Component } from 'react';
import Form from './Form';
import Posts from './Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.addPost = this.addPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  addPost(post) {
    const { posts } = this.state;
    const appData = JSON.stringify([post].concat(posts));
    localStorage.setItem('appData', appData);
    this.setState({
      posts: [post].concat(posts)
    });
  }

  deletePost(id) {
    const appState = this.state.posts;
    const postsWithoutDeletedOne = appState.filter(item => item.id !== id);
    const appData = JSON.stringify(postsWithoutDeletedOne);
    localStorage.setItem('appData', appData);
    this.setState({
      posts: postsWithoutDeletedOne
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h3 className="main-title">Подать объявление</h3>
        <Form addPost={this.addPost} />
        <h3 className="main-title">Объявление</h3>
        <Posts posts={posts} deletePost={this.deletePost} />
      </div>
    );
  }
}
export default App;
