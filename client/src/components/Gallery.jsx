import React from 'react';
import GalleryHalf from './GalleryHalf.jsx';
import GalleryQuarter from './GalleryQuarter.jsx';
import Carousel from '../components/Carousel.jsx';
import { highLightCurrentSelection } from './Utility.jsx';
import InitialGallery from './InitialGallery.jsx';
import Share from './Share.jsx';
import Save from './Save.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      highLight: [],
      numOfImages: 0,
      showCarousel: false,
      showPhotoList: true,
      showShare: false,
      showSave: false,
      handleClickedSave: false,
      currentImageIndex: 0,
      moveViewPhotosBtn: false
    };

    // Turn on & off console.log
    this.DEBUG = false;
    this.DEBUG_2 = true;

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.handleImageClickShowCarousel = this.handleImageClickShowCarousel.bind(
      this
    );
    this.handleImageClickHideCarousel = this.handleImageClickHideCarousel.bind(
      this
    );
    this.nextSlide = this.nextSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.handleClickedSquare = this.handleClickedSquare.bind(this);
    this.handleShowPhotoList = this.handleShowPhotoList.bind(this);
    this.handleHidePhotoList = this.handleHidePhotoList.bind(this);
    this.handleClickedShare = this.handleClickedShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleClickedSave = this.handleClickedSave.bind(this);
    this.handleCloseSave = this.handleCloseSave.bind(this);
  }

  componentDidMount() {
    let href = window.location.href;
    // href = href.replace(/home\/\d?/, '');
    href = href.replace(/home\/1/, '');
    const galleryRoute = href + 'gallery';
    if (this.DEBUG_2) {
      console.log('galleryRoute: ', galleryRoute );
    }

    $.ajax({
      method: 'GET',
      url: galleryRoute
    }).done(
      function(data) {
        if (this.DEBUG_2) {
          console.log('data: ', data);
        }
        if (this.DEBUG_2) {
          console.log('data[0].fileName: ', data[0].fileName);
        }
        const len = data.length;
        const hl = [];

        this.setState({ numOfImages: len });

        for (let i = 0; i < len; i++) {
          hl.push({ value: true });
        }

        this.setState({ highLight: hl, images: data });
      }.bind(this)
    );
  }

  hoverOn(e) {
    let targetPos = +e.target.dataset.position;
    const hl = [];
    const len = this.state.numOfImages;

    for (let i = 0; i < len; i++) {
      if (targetPos === i) {
        hl.push({ value: true });
      }
      hl.push({ value: false });
      if (targetPos === 4) {
        this.setState({ moveViewPhotosBtn: true});
      }
      this.setState({highLight: hl});
    }
  }
  hoverOff(e) {
    let hl = [];
    const len = this.state.numOfImages;

    for (let i = 0; i < len; i++) {
      hl.push({ value: true });
    }
    if (!this.state.showCarousel) {
      this.setState({
        highLight: hl,
        moveViewPhotosBtn: false
      });
    }
  }

  handleImageClickShowCarousel(e) {
    // console.log('handleImageClickShowCarousel clicked: ', e.target);
    // console.log('e.target.dataset.position: ', e.target.dataset.position);
    const currentImageIndex = +e.target.dataset.position;
    let hl = [];
    const len = this.state.numOfImages;

    hl = highLightCurrentSelection(currentImageIndex, len);

    this.setState({
      currentImageIndex: currentImageIndex,
      highLight: hl,
      showCarousel: true,
      moveViewPhotosBtn: false,
      showShare: false,
      showSave: false
    });
  }

  handleImageClickHideCarousel(e) {
    this.setState({ showCarousel: false });
  }

  previousSlide(e) {
    const len = this.state.numOfImages;
    const lastIndex = len - 1;
    const currentImageIndex = +this.state.currentImageIndex;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    let hl = [];

    hl = highLightCurrentSelection(index, len);

    this.setState({
      currentImageIndex: index,
      highLight: hl
    });
  }

  nextSlide(e) {
    const len = this.state.numOfImages;
    const lastIndex = len - 1;
    const currentImageIndex = +this.state.currentImageIndex;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    let hl = [];

    hl = highLightCurrentSelection(index, len);

    this.setState({
      currentImageIndex: index,
      highLight: hl
    });
  }

  handleClickedSquare(e) {
    console.log('e.target.dataset.position: ', e.target.dataset.position);
    const clickedImageIndex = +e.target.dataset.position;
    const len = this.state.numOfImages;
    let hl = [];

    hl = highLightCurrentSelection(clickedImageIndex, len);

    this.setState({
      currentImageIndex: clickedImageIndex,
      highLight: hl
    });
  }

  handleShowPhotoList(e) {
    this.setState({ showPhotoList: true });
  }

  handleHidePhotoList(e) {
    this.setState({ showPhotoList: false });
  }

  handleClickedShare(e) {
    if (!this.state.showSave) {
      this.setState(function() {
        return { showShare: !this.state.showShare };
      });
    }
  }

  handleCloseShare(e) {
    this.setState({ showShare: false });
  }

  handleClickedSave(e) {
    if (!this.state.showShare) {
      this.setState(function() {
        return { showSave: !this.state.showSave };
      });
    }
  }

  handleCloseSave(e) {
    this.setState({ showSave: false });
  }

  
  render() {
    if (this.state.images.length) {

      let image0 = this.state.images[0].fileName;
      let image1 = this.state.images[1].fileName;
      let image2 = this.state.images[2].fileName;
      let image3 = this.state.images[3].fileName;
      let image4 = this.state.images[4].fileName;
      return (
        <div className="container-fluid">
          <img src='https://s3-us-west-1.amazonaws.com/image-store-100/best_bnb_nav.png' style={{width: '100%', height: '75px'}}/>
          <Carousel
            showCarousel={this.state.showCarousel}
            hideCarousel={this.state.hideCarousel}
            handleImageClickHideCarousel={this.handleImageClickHideCarousel}
            nextSlide={this.nextSlide}
            previousSlide={this.previousSlide}
            images={this.state.images}
            currentImageIndex={this.state.currentImageIndex}
            numOfImages={this.state.numOfImages}
            handleClickedSquare={this.handleClickedSquare}
            highLight={this.state.highLight}
            handleShowPhotoList={this.handleShowPhotoList}
            handleHidePhotoList={this.handleHidePhotoList}
            showPhotoList={this.state.showPhotoList}
          />
          <Share
            showShare={this.state.showShare}
            handleCloseShare={this.handleCloseShare}
          />
          <Save
            image0={image0}
            showSave={this.state.showSave}
            handleCloseSave={this.handleCloseSave}
          />
          <div className="row">
            <GalleryHalf
              image={image0}
              position={0}
              hoverOn={this.hoverOn}
              hoverOff={this.hoverOff}
              highLight={this.state.highLight[0].value}
              handleImageClickShowCarousel={this.handleImageClickShowCarousel}
            />
            <div className="col-6">
              <div className="row">
                <GalleryQuarter
                  image={image1}
                  position={1}
                  hoverOn={this.hoverOn}
                  hoverOff={this.hoverOff}
                  highLight={this.state.highLight[1].value}
                  handleImageClickShowCarousel={
                    this.handleImageClickShowCarousel
                  }
                />
                <GalleryQuarter
                  image={image2}
                  image0={image0}
                  position={2}
                  hoverOn={this.hoverOn}
                  hoverOff={this.hoverOff}
                  highLight={this.state.highLight[2].value}
                  handleClickedShare={this.handleClickedShare}
                  handleClickedSave={this.handleClickedSave}
                  handleImageClickShowCarousel={
                    this.handleImageClickShowCarousel
                  }
                />
              </div>
              <div className="row">
                <GalleryQuarter
                  image={image3}
                  position={3}
                  hoverOn={this.hoverOn}
                  hoverOff={this.hoverOff}
                  highLight={this.state.highLight[3].value}
                  handleImageClickShowCarousel={
                    this.handleImageClickShowCarousel
                  }
                />
                <GalleryQuarter
                  image={image4}
                  position={4}
                  hoverOn={this.hoverOn}
                  hoverOff={this.hoverOff}
                  highLight={this.state.highLight[4].value}
                  handleImageClickShowCarousel={
                    this.handleImageClickShowCarousel
                  }
                  moveViewPhotosBtn={this.state.moveViewPhotosBtn}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <img src='images/best_bnb_nav.png' style={{ width: '100%', height: '75px' }} />
          <InitialGallery />
        </div>
      );
    }
  }
}
export default Gallery;
