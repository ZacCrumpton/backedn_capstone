import React from 'react';
import './EditArtistPhoto.scss';
import artistData from '../../helpers/data/artistData';

class EditArtistPhoto extends React.Component {
  state = {
    artistPhoto: '',
  }

  artistPhotoChange = (e) => {
    e.preventDefault();
    this.setState({ artistPhoto: e.target.value });
  }

  EditArtistPhoto = (e) => {
    e.preventDefault();
    const { artistid } = this.props.match.params;
    const {
      artistPhoto,
    } = this.state;
    const updatedArtistPhoto = {
      artistPhoto,
    };
    console.error(updatedArtistPhoto);
    artistData.updateArtistPhoto(artistid, updatedArtistPhoto)
      .then(() => this.props.history.push('/artisthome'))
      .catch((err) => console.error('unable to update artist photo: ', err));
  }

  render() {
    const {
      artistPhoto,
    } = this.state;

    return (
      <div className="EditArtistPhoto">
        <h1>Edit Photo</h1>
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="artist-photo">Photo Url</label>
            <input
            typ="text"
            className="form-control"
            id="artist-photo"
            value={artistPhoto}
            onChange={this.artistPhotoChange}
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={this.EditArtistPhoto}>Save</button>
        </form>
      </div>
    );
  }
}

export default EditArtistPhoto;
