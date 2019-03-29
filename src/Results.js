import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

const petfinder = pf({
    key: "cLbIyBWaRBctoceRo954JvE1aaPDbbaLvA3LUrWBS60GiV3pIK",
    secret: "4S3DoqbJKk6huTkaT4pvVCCjZc7Vwoujqr3IBPa5"
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:true,
      pets: []
    };
  }

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
    this.search();
  }

  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets =
          data.petfinder.pets && data.petfinder.pets.pet
            ? Array.isArray(data.petfinder.pets.pet)
              ? data.petfinder.pets.pet
              : [data.petfinder.pets.pet]
            : [];
        this.setState({
          pets,
          loading: false
        });
      });
  };

  render() {
      if (this.state.loading) {
          return this.loadingAnimation;
      }
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;

          breed = Array.isArray(pet.breeds.breed)
            ? pet.breeds.breed.join(", ")
            : pet.breeds.breed;
          return (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
