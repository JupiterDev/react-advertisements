import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      phoneNumber: '',
      city: '',
      photoName: '',
      photoPath: '',
      titleIsNotEmpty: false,
      titleChanged: false,
      phoneNumberIsNotEmpty: false,
      phoneNumberChanged: false,
      phoneNumberIsValid: false,
      titleFailed: false,
      phoneNumberFailed: false
    };
    this.fileRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.displayPhotoPreview = this.displayPhotoPreview.bind(this);
    this.deletePhotoPreview = this.deletePhotoPreview.bind(this);
  }

  handleTitleChange(e) {
    if (e.target.value) {
      this.setState({
        ...this.state,
        titleIsNotEmpty: true,
        title: e.target.value,
        titleChanged: true,
        titleFailed: false
      });
    } else {
      this.setState({ ...this.state, title: '', titleIsNotEmpty: false });
    }
  }

  handleTextChange(e) {
    this.setState({ ...this.state, text: e.target.value });
  }

  handlePhoneNumberChange(e) {
    const phoneExp = /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    const phone = e.target.value;
    if (phone.match(phoneExp)) {
      this.setState({
        ...this.state,
        phoneNumber: phone,
        phoneNumberChanged: true,
        phoneNumberIsValid: true,
        phoneNumberIsNotEmpty: true,
        phoneNumberFailed: false
      });
    } else if (!phone.match(phoneExp) && phone) {
      this.setState({
        ...this.state,
        phoneNumber: phone,
        phoneNumberChanged: true,
        phoneNumberIsValid: false,
        phoneNumberIsNotEmpty: true,
        phoneNumberFailed: false
      });
    } else if (!phone) {
      this.setState({
        ...this.state,
        phoneNumber: phone,
        phoneNumberChanged: true,
        phoneNumberIsValid: false,
        phoneNumberIsNotEmpty: false
      });
    }
  }

  handleCityChange(e) {
    this.setState({ ...this.state, city: e.target.value });
  }

  handlePhotoChange(e) {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    this.setState({
      ...this.state,
      photoName: e.target.value.replace(/^.*\\/, ''),
      photoPath: imageURL
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addPost } = this.props;
    const stateWithId = this.state;
    const {
      titleIsNotEmpty,
      phoneNumberIsNotEmpty,
      phoneNumberIsValid,
      titleFailed,
      phoneNumberFailed
    } = this.state;
    stateWithId.id = Date.now();
    if (
      titleIsNotEmpty &&
      !titleFailed &&
      phoneNumberIsNotEmpty &&
      phoneNumberIsValid &&
      !phoneNumberFailed
    ) {
      addPost(stateWithId);
      this.setState({
        id: '',
        title: '',
        text: '',
        phoneNumber: '',
        city: '',
        photoName: '',
        photoPath: '',
        titleIsNotEmpty: false,
        titleChanged: false,
        phoneNumberIsNotEmpty: false,
        phoneNumberChanged: false,
        phoneNumberIsValid: false
      });
    } else if (
      !titleIsNotEmpty &&
      (!phoneNumberIsNotEmpty || !phoneNumberIsValid)
    ) {
      this.setState({
        ...this.state,
        titleFailed: true,
        phoneNumberFailed: true
      });
    } else if (!titleIsNotEmpty) {
      this.setState({ ...this.state, titleFailed: true });
    } else if (!phoneNumberIsNotEmpty || !phoneNumberIsValid) {
      this.setState({ ...this.state, phoneNumberFailed: true });
    }
  }

  titleAlert() {
    const { titleChanged, titleIsNotEmpty, titleFailed } = this.state;
    if (titleChanged && titleIsNotEmpty) {
      return (
        <div className="input-area__alert">
          <img
            src="./src/images/rectangle-13-copy-139.svg"
            className="alert__icon"
            alt="icon"
          />
          <div className="alert__text alert__text_done">Заполнено</div>
        </div>
      );
    }
    if ((titleChanged && !titleIsNotEmpty) || titleFailed) {
      return (
        <div className="input-area__alert">
          <img
            src="./src/images/rectangle-13-copy-146.svg"
            className="alert__icon"
            alt="icon"
          />
          <div className="alert__text alert__text_error">Заполните поле</div>
        </div>
      );
    }
    return (
      <div className="input-area__alert">
        <img
          src="./src/images/rectangle-13-copy-141.svg"
          className="alert__icon"
          alt="icon"
        />
        <div className="alert__text">
          Обязательное поле
          <br />
          Не более 140 символов
        </div>
      </div>
    );
  }

  phoneNumberAlert() {
    const {
      phoneNumberChanged,
      phoneNumberIsValid,
      phoneNumberIsNotEmpty,
      phoneNumberFailed
    } = this.state;
    if (phoneNumberChanged && !phoneNumberIsValid) {
      return (
        <div className="input-area__alert">
          <img
            src="./src/images/rectangle-13-copy-146.svg"
            className="alert__icon"
            alt="icon"
          />
          <div className="alert__text alert__text_error">Неверный формат</div>
        </div>
      );
    }
    if ((phoneNumberChanged && !phoneNumberIsNotEmpty) || phoneNumberFailed) {
      return (
        <div className="input-area__alert">
          <img
            src="./src/images/rectangle-13-copy-146.svg"
            className="alert__icon"
            alt="icon"
          />
          <div className="alert__text alert__text_error">Заполните поле</div>
        </div>
      );
    }
    return (
      <div className="input-area__alert">
        <img
          src="./src/images/rectangle-13-copy-141.svg"
          className="alert__icon"
          alt="icon"
        />
        <div className="alert__text">Обязательное поле</div>
      </div>
    );
  }

  displayPhotoPreview() {
    const { photoName, photoPath } = this.state;
    if (photoName) {
      return (
        <div className="photo-preview">
          <img src={photoPath} alt={photoName} className="photo-preview__img" />
          <div className="photo-preview__sidebar">
            <span className="photo-preview__name">{photoName}</span>
            <button
              className="photo-preview__button"
              type="button"
              onClick={this.deletePhotoPreview}
            >
              Удалить
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  deletePhotoPreview() {
    this.setState({ ...this.state, photoName: '', photoPath: '' });
  }

  render() {
    const {
      title,
      text,
      phoneNumber,
      city,
      photoName,
      photoPath,
      titleChanged,
      titleIsNotEmpty,
      phoneNumberChanged,
      phoneNumberIsValid,
      phoneNumberIsNotEmpty,
      titleFailed,
      phoneNumberFailed
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="label title__lable">Заголовок</div>
        <div className="input-area">
          <input
            name="title"
            type="text"
            value={title}
            className={`input title__input ${
              (titleChanged && !titleIsNotEmpty) || titleFailed
                ? 'title__input_error'
                : null
            }`}
            maxLength="140"
            onChange={this.handleTitleChange}
          />
          {this.titleAlert()}
        </div>
        <div className="label content__lable">Текст объявления</div>
        <div className="input-area">
          <textarea
            name="content"
            maxLength="300"
            className="input content__input"
            value={text}
            placeholder=""
            onChange={this.handleTextChange}
          >
          </textarea>
          <div className="input-area__alert">
            <img
              src="./src/images/rectangle-13-copy-141.svg"
              className="alert__icon"
              alt="icon"
            />
            <div className="alert__text">Не более 300 символов</div>
          </div>
        </div>
        <div className="label phone-number__label">Телефон</div>
        <div className="input-area">
          <input
            name="phone-number"
            type="tel"
            placeholder="+7(___)___-__-__"
            maxLength="16"
            value={phoneNumber}
            className={`input phone-number__input ${
              (phoneNumberChanged && !phoneNumberIsValid) ||
              (phoneNumberChanged && !phoneNumberIsNotEmpty) ||
              phoneNumberFailed
                ? 'phone-number__input_error'
                : null
            }`}
            onChange={this.handlePhoneNumberChange}
          />
          {this.phoneNumberAlert()}
        </div>
        <div className="label city__label">Город</div>
        <select
          name="city"
          className="select city__select"
          onChange={this.handleCityChange}
          value={city}
        >
          <option selected disabled hidden></option>
          <option className="city__option">Москва</option>
          <option className="city__option">Хабаровск</option>
          <option className="city__option">Чебоксары</option>
        </select>
        <label htmlFor="clip-file">
          <span
            className={`button clip-subbutton button_blue ${
              photoName && photoPath ? 'clip-subbutton_active' : null
            }`}
          >
            <svg className="clip-subbutton__image">
              <path d="M4.3,9.4c0,0-1.9,1.5-0.2,3.3c1.7,1.7,3.3-0.2,3.3-0.2L14.9,5c0,0,1.7-1.9-0.3-4s-4-0.3-4-0.3L1.9,9.4   c0,0-2.4,2.6,0.3,5.3C4.8,17.4,7.4,15,7.4,15l6.3-6.3c0,0,0.6-0.5,0.2-1c-0.5-0.5-1,0.2-1,0.2l-5.5,5.5c0,0-2.3,2.7-4.5,0.6   s0.5-4.5,0.5-4.5l7.3-7.3c0,0,1.5-1.7,2.9-0.3c1.4,1.4-0.2,2.9-0.2,2.9L7,11.3c0,0-1.1,1.5-2,0.6c-0.9-0.9,0.6-2,0.6-2l4.9-4.9   c0,0,0.6-0.5,0.1-1s-1,0.2-1,0.2L4.3,9.4z" />
            </svg>
            Прикрепить фото
          </span>
          <input
            type="file"
            alt="send_pic"
            accept="image/jpg, image/jpeg, image/png, image/bmp, image/gif, "
            name="file"
            id="clip-file"
            className="clip-button"
            onChange={this.handlePhotoChange}
          />
        </label>
        {this.displayPhotoPreview()}
        <button type="submit" className="sell-button button button_submit">
          Подать
        </button>
      </form>
    );
  }
}
export default Form;
