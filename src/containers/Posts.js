import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { deletePost } = this.props;
    deletePost(id);
  }

  render() {
    let posts = JSON.parse(localStorage.getItem('appData'));
    !posts ? (posts = []) : null;
    const listPosts = posts.map(item => (
      <div className="post" key={item.id}>
        <div>
          <div className="post__title">{item.title}</div>
          <div className="post__text">{item.text}</div>
          <img src={item.photoPath} className="post__img" alt="1111" />
        </div>
        <div className="aside-column">
          <div className="post__contacts">
            <div className="contacts__phone-number">
              <div className="phone-number__icon"></div>
              <div className="phone-number__text">{item.phoneNumber}</div>
            </div>
            <div className="contacts__location">
              <div className="location__icon"></div>
              <div className="location__text">{item.city}</div>
            </div>
          </div>
          <div className="post__buttons">
            <button
              type="button"
              className="button_blue button post__edit-button"
            >
              Редактировать
            </button>
            <button
              type="button"
              className="button_red button post__delete-button"
              onClick={() => {
                this.handleDelete(item.id);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    ));
    return <div className="posts">{listPosts}</div>;
  }
}
export default Posts;
