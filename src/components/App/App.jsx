import React, { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallary } from "components/ImageGallary/ImageGallary";
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import { ThreeDots } from 'react-loader-spinner';
import {fetchPhotos}  from '../../helpers/api';
import css from "./App.module.css";


export class App extends Component {
  state = {
    query: null,
    page: 1,
    loading: false,
    error: null,
    // hits: null,
    showModal: false,
    selectedHit: null,
    loadMore: true,
    images: [],
    
    
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, query, images } = this.state;
    console.log('Виконався запит componentDidMount');
    if (page !== prevState.page || query !== prevState.query) {
    
      this.setState({ loading: true });
      fetchPhotos(query, page)
        .then((data) => {
          console.log('data', data);
          const newImages = page === 1 ? data.hits : [...images, ...data.hits];
          this.setState({
            images: newImages,
            loading: false,
            error: null,
           loadMore: page+1 < Math.ceil(data.totalHits / 12),
          });
    })
     
        .catch((error) => {
          this.setState({ error, loading: false, images: [] });
        });

    }
      
  }
    
  handleSetQuery = (query, page = 1) => {
    console.log('query', query);
    this.setState({
      query,
      page: 1,
      images: []
    });
  }
  toggleModal = (selectedHit) => {
    this.setState(state => ({
      showModal: !state.showModal,
      selectedHit
    }));
  }
  loadMoreImages = () => {
  const { page, loading } = this.state;
    if (loading) {
      return;
    }
    const nextPage = page + 1;
    this.setState(prevState => ({
        loading: false,
        page: nextPage,
        error: null,
       
      }))
     }
    render() {
      const { error, loading, images, showModal, selectedHit,loadMore } = this.state;
     
      return (
        <div className={css.container}>
          <Searchbar onSubmit={this.handleSetQuery} />
          <ImageGallary images={images} openModal={this.toggleModal} />
        
          { images.length > 0 && loadMore && <Button action={this.loadMoreImages} />}
         
          {loading && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color='tomato'
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              wrapperClassName={css.loader}
              visible={loading}
            />
          )}
         
          {showModal && <Modal selectedHit={selectedHit} onClose={this.toggleModal} />}
         
          {error && <p>{error.message}</p>}
        
        </div>
      );
    }
  }
