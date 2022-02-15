import { useState } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import { List } from './Gallery.styles';

function ImageGallery({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const toggeleModal = e => {
    setShowModal(state => !state);
  };

  const openModal = e => {
    toggeleModal();
    const { largeImageURL, tags } = data.find(
      ({ id }) => id === +e.currentTarget.dataset.id
    );
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggeleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <List>
        {data.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={openModal}
          />
        ))}
      </List>
    </>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
