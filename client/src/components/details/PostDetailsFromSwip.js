import React, { Component } from 'react';
import PostDetails from "./PostDetails";

class PostDetailsFromSwip extends Component {
  render() {
    console.log(this.props, "============")
    return (
      <PostDetails {...this.props} fromswipe={true}/>
    )
  }
}

export default PostDetailsFromSwip
