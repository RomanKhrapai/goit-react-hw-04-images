
import {React, Component } from "react";
import PropTypes from 'prop-types'


import ImageGalleryItem from "components/ImageGalleryItem";
import Modal from "components/Modal";
import { List } from "./Gallery.styles";

class ImageGallery extends Component{
  state ={
    showModal:false,
    largeImageURL:"",
    tags:''
  }

  toggeleModal = (e)=>{
this.setState(({showModal})=>({
  showModal:!showModal,
}))
  }

  openModal = (e)=>{
    this.toggeleModal();
    const {largeImageURL,tags} = this.props.data.find(({id})=> id===+e.currentTarget.dataset.id );
     this.setState({
       largeImageURL,
       tags
    })
  }

  render(){
    const {showModal,largeImageURL,tags} = this.state;
    return(<>
    {showModal && <Modal onClose = {this.toggeleModal}>
      <img src={largeImageURL} alt={tags} />  
      </Modal>}
     <List>
    {this.props.data.map(({id,webformatURL,tags }) =>
      <ImageGalleryItem
      key={id}
      id={id}
      webformatURL={webformatURL}
      tags={tags}
      onClick={this.openModal}
      />
    )}
  </List></>
   
  )
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }))
}

export default ImageGallery;
