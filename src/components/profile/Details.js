import React from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel";

const petfinder = pf({
    key: "cLbIyBWaRBctoceRo954JvE1aaPDbbaLvA3LUrWBS60GiV3pIK",
    secret: "4S3DoqbJKk6huTkaT4pvVCCjZc7Vwoujqr3IBPa5"
});

class Details extends React.Component {
  state = {loading: true  };

  loadingAnimation = (
      <div className="loading-animation-bg">
          <div className="intro-text">
              <h1>Searching For Your Happiness</h1>
          </div>
          <div className="profile-outer-ring">
              <div className="profile-image">
              </div>
          </div>
      </div>
  );
  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        breed = Array.isArray(data.petfinder.pet.breeds.breed)
          ? data.petfinder.pet.breeds.breed.join(", ")
          : data.petfinder.pet.breeds.breed;

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    if (this.state.loading) {
      return this.loadingAnimation;
    }
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
    } = this.state;
    return (
      <div className="details">
        <div className="pet-gallery">
          <Carousel media={media}/>
        </div>
        <div className="pet-details alert alert-danger">
          <h1>{name}</h1>
          <p>
            {animal} - {breed} - {location}
          </p>
          <p className="pet-description">{description}</p>
          <button type="button" className="btn btn-danger btn-adopt" data-toggle="modal" data-target="#exampleModalCenter">
            <h2>YOU WANT ME?</h2>
          </button>
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
               aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Are You Sure?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">YES</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal">DEFINITELY YES</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
