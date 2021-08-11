import React, { Component } from "react";

class SelectInput extends Component {
  changeMultiple = (e) => {
    let arrMultiple = [];
    for (const key in e.target.options) {
      if (Object.hasOwnProperty.call(e.target.options, key)) {
        const element = e.target.options[key];
        if (element.selected) {
          arrMultiple.push(element.value);
        }
      }
    }
    this.props.change(e.target.name, arrMultiple);
  };

  render() {
    return (
      <label>
        {this.props.label}
        <select
          multiple={this.props.multiple ? true : false}
          name={this.props.name}
          value={this.props.multiple ? [...this.props.value] : this.props.value}
          onChange={(e) => {
            if (this.props.multiple) {
              this.changeMultiple(e);
            } else {
              this.props.change(e);
            }
          }}
        >
          <option value="none">Choose {this.props.multiple ? "options" : "option"}</option>
          {this.props.options.map((option, idx) => {
            return (
              <option key={idx} value={option} >
                {option}
              </option>
            );
          })}
        </select>
      </label>
    );
  }
}

export default SelectInput;
