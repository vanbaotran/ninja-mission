import React, { Component } from "react";
import BlueTop from "./backgrounds/BlueTop";

class GiveBadges extends Component {
  state: {
    motivation: 0,
    skills: 0,
    humour: 0,
    culture: 0,
  };
rating = (e) => {
  this.setState({[e.target.name]: e.target.value});
}
  render() {
    return (
      <div>
        <BlueTop />
        <div className="top-line flex-row">
          <img
            onClick={() => {
              this.props.history.push("/profilepage");
            }}
            src="/images/icons/back.png"
            alt="icon back"
          />
          <h1 className="text-yellow">Give Badges </h1>
          <img src="" alt="" />
        </div>
        <div className="my-badges">
            <form onSubmit={this.handleSubmit}>
          <section>
            <div className="element">
              <img src="/images/motivation.png" alt="motiv" />
              <p>Motivation</p>
            </div>
              <label id="rating-line"></label>
              <div className="rating motivation">
                <input  id="star1" onClick={(e) => this.rating(e)} name="motivation" type="radio" value="5" className="radio-btn hide" />
                <label for="star1" >☆
                </label>
                <input  id="star2" onClick={(e) => this.rating(e)} name="motivation" type="radio" value="4" className="radio-btn hide" />
                <label for="star2" >☆
                </label>
                <input  id="star3" onClick={(e) => this.rating(e)} name="motivation" type="radio" value="3" className="radio-btn hide" />
                <label for="star3" >☆
                </label>
                <input  id="star4" onClick={(e) => this.rating(e)} name="motivation" type="radio" value="2" className="radio-btn hide" />
                <label for="star4" >☆
                </label>
                <input  id="star5" onClick={(e) => this.rating(e)} name="motivation" type="radio" value="1" className="radio-btn hide" />
                <label for="star5" >☆
                </label>
              </div>
          {/* </section>

          <section> */}
            <div className="element">
              <img src="/images/humour.png" alt="humour" />
              <p>Humour</p>
            </div>
            <label id="rating-line"></label>
              <div className="rating humour">
                <input  id="star6" onClick={(e) => this.rating(e)} name="humour" type="radio" value="5" className="radio-btn hide" />
                <label for="star6" >☆
                </label>
                <input  id="star7" onClick={(e) => this.rating(e)} name="humour" type="radio" value="4" className="radio-btn hide" />
                <label for="star7" >☆
                </label>
                <input  id="star8" onClick={(e) => this.rating(e)} name="humour" type="radio" value="3" className="radio-btn hide" />
                <label for="star8" >☆
                </label>
                <input  id="star9" onClick={(e) => this.rating(e)} name="humour" type="radio" value="2" className="radio-btn hide" />
                <label for="star9" >☆
                </label>
                <input  id="star10" onClick={(e) => this.rating(e)} name="humour" type="radio" value="1" className="radio-btn hide" />
                <label for="star10" >☆
                </label>
              </div>
            {/* <Rating>{this.props.currentUser.humour}</Rating> */}
          </section>
          <section>
            <div className="element">
              <img src="/images/skills.png" alt="skills" />
              <p>Skills</p>
            </div>
            {/* <Rating>{this.props.currentUser.skills}</Rating> */}
          </section>
          <section>
            <div className="element">
              <img src="/images/culture.png" alt="culture" />
              <p>Culture</p>
            </div>
            {/* <Rating>{this.props.currentUser.culture}</Rating> */}
          </section>
            </form>
        </div>
      </div>
    );
  }
}

export default GiveBadges;
