// import React, { Component } from "react";
import { ImageGallaryItem } from "components/ImageGallaryItem/ImageGallaryItem";
import css from './ImageGallary.module.css';
import { nanoid } from 'nanoid'
export const ImageGallary = ({ images,openModal}) => {
   if (!images || !Array.isArray(images) || images.length === 0) {
    return null; 
  }
    return (
      
        <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL,largeImageURL,tags }) => (
        <ImageGallaryItem key={nanoid()} webformatURL={webformatURL} tags={tags}  onClick={() =>openModal({id, largeImageURL,tags})}  />
      ))}
    </ul>
  );
};

    
