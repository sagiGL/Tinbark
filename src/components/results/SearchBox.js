import React, { Component } from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => (
            <div>
                <button className="btn btn-danger toggle-search-mobile" data-toggle="collapse" href="#search-collapse"
                   aria-expanded="true" aria-controls="search-collapse">
                   <span role="img" aria-label="search-icon">🔎</span>
                </button>
            <div className="collapse show" id='search-collapse'>
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label className="search-label" htmlFor="location">
                  <input type="text" className="form-control" onChange={context.handleLocationChange} id="location" value={context.location} placeholder="Location"/>
                </label>
              </div>
              <div className="form-group col-md-4">
                <label className="search-label" htmlFor="animal">
                  <select id="animal" className="form-control" value={context.animal} onChange={context.handleAnimalChange} onBlur={context.handleAnimalChange} >
                    <option defaultValue>animal</option>
                    {ANIMALS.map(animal => (<option key={animal} value={animal}>{animal}</option>))}
                  </select>
                </label>
              </div>
              <div className="form-group col-md-4">
                <label className="search-label" htmlFor="breed">
                  <select id="breed" className="form-control" value={context.breed} onChange={context.handleBreedChange} onBlur={context.handleBreedChange}>
                    <option>Breed</option>
                    {context.breeds.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
                  </select>
                </label>
              </div>
              <div className="form-group col-md-2">
                  <button type="submit" className="btn btn-danger" data-toggle="collapse" href="#search-collapse"
                          aria-expanded="true" aria-controls="search-collapse">Search</button>
              </div>
            </div>
          </form>
            </div>
            </div>
        )}
      </Consumer>
    );
  }
}
export default SearchBox;
