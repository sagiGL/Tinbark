import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;

    return (
      <div id="pet-gallery" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {
            photos.map((photo,index) => (
              <li key={index} data-target="#petGallery" data-slide-to={index} className={active===index? "active": ""}/>)
            )
          }
        </ol>
        <div className="carousel-inner">
          {photos.map((photo,index) => (
            <div className={`carousel-item ${active===index? "active": ""}`} key={index}>
              <img className="pet-gallery-image d-block w-100" src={photo.value} alt={"slide " + index}/>
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#pet-gallery" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"/>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#pet-gallery" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"/>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Carousel;
