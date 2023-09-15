// import React, { Component } from "react";
import { ImageGallaryItem } from "components/ImageGallaryItem/ImageGallaryItem";
import css from './ImageGallary.module.css'
export const ImageGallary = ({ hits,openModal}) => {
   if (!hits || !Array.isArray(hits) || hits.length === 0) {
    return null; 
  }
    return (
      
        <ul className={css.imageGallery}>
      {hits.map(({ id, webformatURL,largeImageURL,tags }) => (
        <ImageGallaryItem key={id} webformatURL={webformatURL} tags={tags}  onClick={() =>openModal({id, largeImageURL,tags})}  />
      ))}
    </ul>
  );
};

    
