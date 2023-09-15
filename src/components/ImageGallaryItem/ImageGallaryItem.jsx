import css from './ImageGallaryItem.module.css';
export const ImageGallaryItem = ({ id, webformatURL, tags,onClick }) => {
    return(
        <li key={id} className={css.galleryItem}>
            <img src={webformatURL} alt={tags} className={css.imageGallaryItem} onClick={onClick } />
        </li>
    )
}

