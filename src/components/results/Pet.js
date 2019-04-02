import React from "react";
import { Link } from "@reach/router";

class Pet extends React.Component {
  render() {
    const { name, breed, media, location, id } = this.props;

    let photos =
      media && media.photos && media.photos.photo
        ? media.photos.photo.filter(photo => photo["@size"] === "pn")
        : [];
    let photo =
      photos.length !== 0
        ? photos[0].value
        : "https://images.pexels.com/photos/1663421/pexels-photo-1663421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

    return (
      <Link to={`/details/${id}`} className=" pet-item container-fluid alert alert-danger">
        <div className="">
          <img className="pet-item-image rounded-circle border " src={photo} alt={name} />
        </div>
        <div className="pet-info">
            <h2 className="pet-name">{name}</h2>
                <h3 className="pet-breed">{breed}</h3>
            <h3 className="pet-location"><span role="img" aria-label="location-icon">🌎</span>{location}</h3>

        </div>
      </Link>
    );
  }
}
export default Pet;
