import React, { Component } from "react";

export class UniqueSelectInput extends Component {
  render() {
    return (
      <label>
        {this.props.label}
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.change}
          multiple={this.props.multiple ? true : false}
        >
          <option value="">Choose {this.props.multiple ? "one or more" : "an"} option</option>
          {this.props.options.map((option, idx) => {
            return <option key={idx} value={option}>{option}</option>;
          })}
        </select>
      </label>
    );
  }
}

export default UniqueSelectInput;
