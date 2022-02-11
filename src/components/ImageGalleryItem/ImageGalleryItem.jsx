import PropTypes from 'prop-types'

import { Image } from "./Image.styles";
import { Item } from "./ImageGalleryItem.styles";

const ImageGalleryItem = ({
    webformatURL,id,tags,onClick
}) => {
  return(
    <Item data-id={id} onClick={onClick}>
    <Image src={webformatURL} alt={tags} />
  </Item>
  )
}

ImageGalleryItem.propTypes = {
   onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;

