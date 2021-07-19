import React, { Component } from "react";

class TextInput extends Component {
  render() {
    return (
      <label className={this.props.className}>
        {this.props.label}
        {this.props.area ? (
          <textarea
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.change}
            rows={this.props.rows ? this.props.rows : 5}
            cols={this.props.cols ? this.props.cols : 25}
          />
        ) : (
          <input
            type="text"
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.change}
          />
        )}
      </label>
    );
  }
}

export default TextInput;
