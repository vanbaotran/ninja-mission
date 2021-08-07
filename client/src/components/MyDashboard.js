import React from "react";
import service from "./service";
import BlueTop from './backgrounds/BlueTop';
// import BlueBottom from './backgrounds/BlueBottom'
class MyDashBoard extends React.Component {
  state = {
    offerList: [],
  };
  goToDetails = (postId) => {
    this.props.history.push(`/mydashboard/${postId}`);
  };
  getDate = (dateFromDB) => {
    let today = new Date();
    let theDay = new Date(dateFromDB)
    let difference = today.getTime() - theDay.getTime();
    let differentInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    return differentInDays;
  };
  
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
    } else {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <div>
        <BlueTop/>
        {/* <BlueBottom/> */}
        <div className='top-line flex-row'> 
          <img onClick={()=>{this.props.history.push('/profilepage')}} src='/images/icons/back.png' alt='icon back'/>
          <h1 className='text-yellow'>My Dashboard </h1>
          <img src='' alt=''/>
        </div>
        <div className="dashboard">
          {this.state.offerList.map((offer) => {
            let dateNumber = this.getDate(offer.createdAt)
            return (
              (this.props.currentPostId === offer._id && (
                <div
                  onClick={() => this.goToDetails(offer._id)}
                  style={{ backgroundColor: "#F7E194" }}
                  className="element"
                  key={offer._id}
                >
                  <h2>{offer.position}</h2>
                  <p>
                    {dateNumber > 1 ? `${dateNumber} days ago` :
                      "today"}
                  </p>
                  <p>{offer.applicationId.candidateId.length} applicants</p>
                </div>
              )) || (
                <div
                  onClick={() => this.goToDetails(offer._id)}
                  className="element"
                  key={offer._id}
                >
                  <h2>{offer.position}</h2>
                  <p>
                    {dateNumber > 1 ? `${dateNumber} days ago` :
                      "today"}
                  </p>
                  <p>{offer.applicationId.candidateId.length} applicants</p>
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
