import React, { Component } from "react";
import { Router } from "@reach/router";
import Results from "./components/results/Results";
import Details from "./components/profile/Details";
import SearchParams from "./components/results/SearchParams";
import pf from "petfinder-client";
import { Provider } from "./components/results/SearchContext";
import "./App.css";
import Header from "./components/header/header";

// const petfinder = pf({
//     key: process.env.API_KEY,
//     secret: process.env.API_SECRET
// });
const petfinder = pf({
    key: "cLbIyBWaRBctoceRo954JvE1aaPDbbaLvA3LUrWBS60GiV3pIK",
    secret: "4S3DoqbJKk6huTkaT4pvVCCjZc7Vwoujqr3IBPa5"
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "Seattle, WA",
            animal: "animal",
            breed: "Corgi",
            breeds: [],
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            handleLocationChange: this.handleLocationChange,
            getBreeds: this.getBreeds
        };
    }
    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    };
    handleAnimalChange = event => {
        this.setState(
            {
                animal: event.target.value,
                breed: ""
            },
            this.getBreeds
        );
    };
    handleBreedChange = event => {
        this.setState({
            breed: event.target.value
        });
    };
    getBreeds() {
        this.state.animal
            ? petfinder.breed.list({ animal: this.state.animal }).then(data => {
                data.petfinder &&
                data.petfinder.breeds &&
                Array.isArray(data.petfinder.breeds.breed)
                    ? this.setState({ breeds: data.petfinder.breeds.breed })
                    : this.setState({ breeds: [] });
            })
            : this.setState({ breeds: [] });
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <Provider value={this.state}>
                    <Router>
                        <Results path="/" />
                        <Details path="/details/:id" />
                        <SearchParams path="/search-params" />
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
