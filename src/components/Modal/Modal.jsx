import React, { Component } from "react";
import css from './Modal.module.css'
export class Modal extends Component{
    componentDidMount() {
        window.addEventListener("keydown",this.handleKeydown);
        
    }
    handleKeydown = (event) => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }
    componentWillUnmount() {
        window.removeEventListener("keydown",this.handleKeydown)
    }
    handleBackdropClick = (event) => {
       if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        const { selectedHit } = this.props;
        return(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
    <img src={selectedHit.largeImageURL} alt={selectedHit.tags} className={css.imageLarge} />
  </div>
            </div>
        )
    }
}