
import React, { Component } from "react";
import css from './Searchbar.module.css';
import { FaSistrix } from "react-icons/fa6";
export class Searchbar extends Component{
  state={
    query:""
  }

    handleChange = (event) => {
       this.setState({query:event.currentTarget.value.toLowerCase()}) 
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.query.trim() === "") {
      alert('Enter the name of search');
      return
    }
    this.props.onSubmit(this.state.query);
    this.setState({query:""})
  }
    render() {
        return (
          <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={this.handleSubmit}>
              <button type="submit" className={css.searchFormButton}>
      <span className={css.searchFormButtonLabel} ><FaSistrix/></span>
    </button>

    <input
                className={css.searchFormInput}
      type="text"
      autoComplete="off"
                autoFocus
                value={this.state.query}
                onChange={this.handleChange}
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }
}