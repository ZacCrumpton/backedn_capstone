import React from 'react';
import artistData from '../../helpers/data/artistData';
import authData from '../../helpers/data/authData';
import './UserCreateAccount.scss';

class CreateAccount extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      userName: '',
      city: '',
      state: '',
      Dob: '',
      isUser: true,
      userPhoto: '',
    },
  }

  componentDidMount() {

  }

  userEmailChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.email = e.target.value;
    this.setState({ user: temp });
  }

  userPasswordChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.password = e.target.value;
    this.setState({ user: temp });
  }

  userNameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.userName = e.target.value;
    this.setState({ user: temp });
  }

  cityChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.city = e.target.value;
    this.setState({ user: temp });
  }

  stateChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.state = e.target.value;
    this.setState({ user: temp });
  }

  DoBChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.DoB = e.target.value;
    this.setState({ user: temp });
  }

  userPhotoChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.userPhoto = e.target.value;
    this.setState({ user: temp });
  }

  submit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    authData.registerUser(user)
      .then(() => {
        this.props.history.push('/userhome');
      })
      .catch((err) => console.error('could not regist user: ', err));
  }

  loginPage = (e) => {
    e.preventDefault();
    e.view.location.pathname = '/login';
  }

  render() {
    return (

      <div className="UserCreateAccount d-flex justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="user-userEmail" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="user-userEmail" onChange={this.userEmailChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-userPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="users-password" onChange={this.userPasswordChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-userName" className="form-label">Name</label>
          <input type="text" className="form-control" id="user-userName" onChange={this.userNameChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-city" className="form-label">City</label>
          <input type="text" className="form-control" id="user-city" onChange={this.cityChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-state" className="form-label">State</label>
          <input type="text" className="form-control" id="user-state" onChange={this.stateChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-dob" className="form-label">Birth Date</label>
          <input type="text" className="form-control" id="user-dob" placeholder="YYYY-MM-DD" onChange={this.DoBChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="user-userPhoto" className="form-label">Photo Url</label>
          <input type="text" className="form-control" id="user-userPhoto" onChange={this.userPhotoChange}/>
        </div>
        <button type="submit" className="btn btn-primary mx-auto" onClick={this.submit}>Submit</button>
        <p>Already have an account? <small className="border-bottom border-dark" onClick={this.loginPage}>Click Here</small></p>
      </div>

    );
  }
}

export default CreateAccount;
