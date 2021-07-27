import React from "react";
import service from "./service";
class MyDashBoard extends React.Component {
  state = {
    offerList: [],
  };
  goToDetails = (postId) => {
    this.props.history.push(`/mydashboard/${postId}`);
  };
  getDate = (dateString) => {
    let today = new Date();
    let theDay = new Date(dateString);
    let difference = today.getTime() - theDay.getTime();
    let differentInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    return differentInDays;
  };
  // getApplicants = (jobPostId) => {
  //   service
  //     .get(`/posts/${jobPostId}`)
  //     .then((response) => {
  //       // let theList = []
  //       console.log(response.data.applicationId.candidateId.length);
  //       // let object = {applicants:response.data.applicationId.candidateId.length}
  //       // let myArray = [...this.state.offerList]
  //       // let index = myArray.findIndex(x=>x._id===jobPostId)
  //       // let theObject = {...myArray[index],applicantsNumber:response.data.applicationId.candidateId.length}
  //       // theList.push(theObject)
  //       // console.log(theObject)
  //       // this.setState({offerList:theList})
  //     })
  //     .catch((err) => console.log(err));
  // };
  componentDidMount() {
    if (this.props.currentUser) {
      service
        .get(`/posts/recruiter/${this.props.currentUser._id}`)
        .then((response) => {
          this.setState({
            offerList: response.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <div>
        <h1>MY DASHBOARD </h1>
        <div className="dashboard">
          {this.state.offerList.map((offer) => {
            return (
              (this.props.currentPostId === offer._id && (
                <div
                  onClick={() => this.goToDetails(offer._id)}
                  style={{ backgroundColor: "#F7E194" }}
                  className="element"
                  key={offer._id}
                >
                  <h2>{offer.offerName}</h2>
                  <p>
                    {(this.getDate(offer.updatedAt) > 1 && "days ago") ||
                      "1 day ago"}
                  </p>
                  {/* <p>{this.getApplicants(offer._id)} applicants</p> */}
                </div>
              )) || (
                <div
                  onClick={() => this.goToDetails(offer._id)}
                  className="element"
                  key={offer._id}
                >
                  <h2>{offer.offerName}</h2>
                  <p>
                    {(this.getDate(offer.updatedAt) > 1 && "days ago") ||
                      "1 day ago"}
                  </p>
                  {/* <p>{this.getApplicants(offer._id)} applicants</p> */}
                </div>
              )
            );
          })}
        </div>
      </div>
    );
  }
}
export default MyDashBoard;
