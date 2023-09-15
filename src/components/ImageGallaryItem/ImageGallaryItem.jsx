import css from './ImageGallaryItem.module.css';
export const ImageGallaryItem = ({ id, webformatURL, tags,onClick }) => {
    return(
        <li className={css.galleryItem} key={id}>
            <img src={webformatURL} alt={tags} className={css.imageGallaryItem} onClick={onClick } />
        </li>
    )
}

