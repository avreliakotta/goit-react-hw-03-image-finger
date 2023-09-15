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
    // images:[]
    }

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ loading: true});
      //   fetch(`https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=38409790-9d6abd70194af5cc66bb0293b&image_type=photo&orientation=horizontal&per_page=12`)
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //       return Promise.reject(new Error(`Not found ${this.state.query}`));
      //     })
    
      fetchPhotos(query,page)
        .then((data) => {
          console.log(data);
          this.setState({ hits: data.hits, loading: false, error: null });
        })
        .catch((error) => {
          this.setState({ error, loading: false, hits: null });
        });
    }


    }
  
    handleSetQuery = (query,page) => {
      console.log(query,page);
      this.setState({
        query,
        page
        
      });
    }
    toggleModal = (selectedHit) => {
      this.setState(state => ({
        showModal: !state.showModal,
        selectedHit
      }));
  }
//   loadMoreImages = () => {
//     const { query, page,hits } = this.state;
//     const nextPage = page + 1;
//      this.setState({ loading: true});
//     fetchPhotos(query, nextPage).then((data) => {
       
//   this.setState(prev =>({
//  images: [...prev.images, ...hits],
//  loadMore: this.state.page < Math.ceil(data.totalHits / 12 ),

// }))
//     }).catch((error => {
//        this.setState({ error, loading: false });
//     }))
    
  //   }
// loadMoreImages = () => {
//   const { query, page } = this.state;
//   const nextPage = page + 1;
  
//   this.setState({ loading: true, page: nextPage }); 

//   fetchPhotos(query, nextPage)
//     .then((data) => {
//       this.setState((prevState) => ({
//         images: [...prevState.images, ...data.hits],
//         loading: false,
//         error: null,
//       }));
//     })
//     .catch((error) => {
//       this.setState({ error, loading: false });
//     });
// }




 
    render() {
      const { error, loading,hits, showModal, selectedHit } = this.state;
    
      return (
        <div className={css.container}>
          <Searchbar onSubmit={this.handleSetQuery} />
          <ImageGallary hits={hits} openModal={this.toggleModal} />
        <Button>Load more</Button>

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
