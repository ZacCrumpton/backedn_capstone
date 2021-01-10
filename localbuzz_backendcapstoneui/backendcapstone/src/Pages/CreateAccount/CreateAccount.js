import React from 'react';
import artistData from '../../helpers/data/artistData';
import authData from '../../helpers/data/authData';
import './CreateAccount.scss';

class CreateAccount extends React.Component {
  state = {
    artist: {
      artistEmail: '',
      artistPassword: '',
      artistName: '',
      city: '',
      state: '',
      genre: '',
      isArtist: true,
      ArtistPhoto: '',
    },
  }

  componentDidMount() {

  }

  artistEmailChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.artistEmail = e.target.value;
    this.setState({ artist: temp });
  }

  artistPasswordChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.artistPassword = e.target.value;
    this.setState({ artist: temp });
  }

  artistNameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.artistName = e.target.value;
    this.setState({ artist: temp });
  }

  cityChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.city = e.target.value;
    this.setState({ artist: temp });
  }

  stateChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.state = e.target.value;
    this.setState({ artist: temp });
  }

  genreChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.genre = e.target.value;
    this.setState({ artist: temp });
  }

  artistPhotoChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.artist };
    temp.artistPhoto = e.target.value;
    this.setState({ artist: temp });
  }

  submit = (e) => {
    e.preventDefault();
    const { artist } = this.state;
    authData.registerArtist(artist)
      .then(() => {
        artistData.getArtistById(artist.artistId);
        this.props.history.push('/artisthome');
      })
      .catch((err) => console.error('could not regist artist: ', err));
  }

  loginPage = (e) => {
    e.preventDefault();
    e.view.location.pathname = '/login';
  }

  render() {
    return (

      <div className="CreateAccount d-flex justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="artist-artistEmail" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="artist-artistEmail" onChange={this.artistEmailChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-artistPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="users-password" onChange={this.artistPasswordChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-artistName" className="form-label">Name</label>
          <input type="text" className="form-control" id="artist-artistName" onChange={this.artistNameChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-city" className="form-label">City</label>
          <input type="text" className="form-control" id="artist-city" onChange={this.cityChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-state" className="form-label">State</label>
          <input type="text" className="form-control" id="artist-state" onChange={this.stateChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-genre" className="form-label">Genre</label>
          <input type="text" className="form-control" id="artist-genre" onChange={this.genreChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="artist-artistPhoto" className="form-label">Photo Url</label>
          <input type="text" className="form-control" id="artist-artistPhoto" onChange={this.artistPhotoChange}/>
        </div>
        <button type="submit" className="btn btn-primary mx-auto" onClick={this.submit}>Submit</button>
        <p>Already have an account? <small className="border-bottom border-dark" onClick={this.loginPage}>Click Here</small></p>
      </div>

    );
  }
}

export default CreateAccount;
