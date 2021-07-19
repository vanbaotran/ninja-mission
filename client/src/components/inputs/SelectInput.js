import React, { Component } from "react";

class SelectInput extends Component {
  change = (e) => {
    console.log(e);
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
          name={this.props.name}
          defaultValue={this.props.currentValue}
          onChange={(e) => {
            if (this.props.multiple) {
              this.change(e);
            } else {
              this.props.change(e);
            }
          }}
          multiple={this.props.multiple ? true : false}
        >
          <option value="">Choose {this.props.multiple ? "options" : "option"}</option>
          {this.props.options.map((option, idx) => {
            return (
              <option key={idx} value={option}>
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
