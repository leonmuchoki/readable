import React, { Component } from 'react'
import { connect } from 'react-redux';
import { sortingType } from '../actions/posts';

class SortPosts extends Component {
  state = {
    sortValue: ''
  }

  changeSortValue = (event) => {
    this.setState({sortValue: event.target.value})
    const sortBy = event.target.value
    if (sortBy !== undefined && sortBy.length > 0) {
      console.log('sortBy...' + sortBy)
      this.props.sortPostsBy(sortBy)
    }
  }

  render() {
    return (
      <div className="sort-wrapper">
        <select className="form-input-select" name="sortBy" onChange={this.changeSortValue} value={this.state.sortValue}>
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="score">Scores</option>
        </select>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortPostsBy: (sortBy) => dispatch(sortingType(sortBy))
  }
}

export default connect(null, mapDispatchToProps)(SortPosts)