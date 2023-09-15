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
    hits: null,
    showModal: false,
    selectedHit: null,
    loadMore: true,
    images:[]
    
    }

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
  console.log('Виконався запит');
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ loading: true});
    fetchPhotos(query,page)
        .then((data) => {
          console.log('data',data);
          const newImages = page === 1 ? data.hits : [...this.state.images, ...data.hits];
           this.setState({ images: newImages, loading: false, error: null });


          // this.setState({ hits: data.hits, loading: false, error: null });
        })
     
        .catch((error) => {
          this.setState({ error, loading: false, images: []  });
        });
     
    }
  }
  handleSetQuery = (query,page) => {
      console.log('query',query);
      this.setState({
        query,
        page: 1,
         });
    }
    toggleModal = (selectedHit) => {
      this.setState(state => ({
        showModal: !state.showModal,
        selectedHit
      }));
  }
  loadMoreImages = () => {
     console.log('loadMoreImages викликано');
    const { query, page, loading } = this.state;
  if (loading) {
      return;
    }

    const nextPage = page + 1;
    this.setState({ loading: true });

    fetchPhotos(query, nextPage)
      .then((data) => {
        
        if (data.hits.length > 0) {
          const newImages = [...this.state.images, ...data.hits];
          this.setState({
            images: newImages,
            loading: false,
            page: nextPage,
            error: null,
             loadMore: nextPage < Math.ceil(data.totalHits / 12),
          });
        } else {
    
          this.setState({ loading: false, loadMore: false });
          console.log("Всі дані завантажено, можна прибрати кнопку");
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }




 
    render() {
      const { error, loading,images,hits, showModal, selectedHit } = this.state;
      console.log('images',images);
      return (
        <div className={css.container}>
          <Searchbar onSubmit={this.handleSetQuery} />
          <ImageGallary images={images} openModal={this.toggleModal} />
        
          <Button action={this.loadMoreImages} />
         
            

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
