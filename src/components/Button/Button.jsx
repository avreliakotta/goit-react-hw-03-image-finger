import React, { Component } from "react";
import css from "./Button.module.css";
export class Button extends Component{
    render() {
        return (
            <button type="button" className={css.loadMoreButton} onClick={this.props.action} >Load more</button>
        )
    }
}