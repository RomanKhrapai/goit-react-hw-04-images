import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

import ImageGallery from '../ImageGallery';
import { ButtonLoadMore } from '../Button/ButtonLoadMore.styles';
import { BoxCenter } from './BoxCenter.styles';
import api from '../../services/api';

function Gallery({ searchText }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchText !== '') {
      fetch(0, searchText);
      setData([]);
      setStatus('panding');
    }
  }, [searchText]);

  const fetch = async (page, search) => {
    page = page + 1;
    try {
      const data = await api.fetchArticlesWithQuery(page, search);
      if (data.totalHits === 0) {
        setStatus('resolvedZero');
        return;
      }
      const newStatus =
        data.totalHits / page <= 12 ? 'resolvedLast' : 'resolved';
      setData(state => [...state, ...data.hits]);
      setPage(page);
      setStatus(newStatus);
    } catch (error) {
      setError('Error server!!!');
      setStatus('rejected');
    }
  };

  const LoadMore = () => {
    fetch(page, searchText);
    setStatus('resolvedPending');
  };

  if (status === 'idle') {
    return <></>;
  }
  if (status === 'panding') {
    return (
      <BoxCenter>
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </BoxCenter>
    );
  }
  if (status === 'resolvedLast') {
    return <ImageGallery data={data} />;
  }
  if (status === 'resolvedZero') {
    return (
      <BoxCenter>
        <h1>Nothing was found for your query!</h1>
      </BoxCenter>
    );
  }

  if (status === 'resolvedPending') {
    return (
      <>
        <ImageGallery data={data} />
        <BoxCenter>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </BoxCenter>
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <ImageGallery data={data} />
        <BoxCenter>
          <ButtonLoadMore type="button" onClick={LoadMore}>
            Load more
          </ButtonLoadMore>
        </BoxCenter>
      </>
    );
  }
  if (status === 'rejected') {
    return (
      <BoxCenter>
        <h1>{error}</h1>
      </BoxCenter>
    );
  }
}

Gallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};

export default Gallery;
