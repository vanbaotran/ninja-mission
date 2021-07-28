import React from "react";
import service from "./service";

class DashboardDetails extends React.Component {
  state = {
    jobPost: "",
    candidateIdList: [],
    candidateList: [],
    query: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    //search by codeLanguage in this.state.candidateList
    event.preventDefault();
  };
  // sortByDate = () =>{
  //   console.log('STATE',this.state.candidateList)
  //   let sortedList = [...this.state.candidateList].sort((a,b)=> a.applicationId.createdAt - b.applicationId.createdAt)
  //   console.log('THE LIST',sortedList)
  //   this.setState({ 
  //     candidateList:sortedList
  //   })
  // }
  getSinglePost = () => {
    service
      .get(`/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          jobPost: response.data.offerName,
          candidateIdList: response.data.applicationId.candidateId,
        });
        this.state.candidateIdList.map((id) => this.getCandidateData(id));
      })
      .catch((err) => console.log(err));
  };
  getCandidateData = (candidateId) => {
    service.get(`/users/${candidateId}`).then((response) => {
      let updatedCandidateList = [...this.state.candidateList];
      updatedCandidateList.push(response.data);
      this.setState({
        candidateList: updatedCandidateList,
      });
    });
  };
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/");
    } else {
      this.getSinglePost();
    }
  }
  render() {
    let candidateArray;
    if (this.state.query!==''){
      candidateArray = this.state.candidateList
          .filter((el) => {
            return el.codeLanguage.some((el) => el.toLowerCase().startsWith(this.state.query.toLowerCase()))
          })
    } else {
      candidateArray = this.state.candidateList
    }
    return (
      <div className="dashboard-details">
        <header>
          <img
            onClick={() => {
              this.props.history.push("/mydashboard");
            }}
            src="/images/icons/back.png"
            alt="back"
          />
          <h1 className="text-yellow">{this.state.jobPost}</h1>
        </header>
        <div className="sort">
          <h4 className="text-red">Sort by</h4>
          <img src="/images/icons/sort.png" alt="sort" />
          <button onClick={()=>this.sortByDate()} className="btn sort">date</button>
          <button className="btn sort">accuracy</button>
          <button className="btn sort">exp level</button>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <label>Code Languages</label>
          <input
            onChange={this.handleChange}
            name="query"
            value={this.state.query}
          />
          <button>
            <img
              className="icon-search"
              src="/images/icons/search.png"
              alt="search"
            />
          </button>
        </form>
        <ul className="candidate-list">
          {candidateArray.map((el) => {
              return (
                <li
                  onClick={() =>
                    this.props.history.push(`/users/${el._id}/fromdashboard`)
                  }
                  key={el._id}
                >
                  {el.avatar ? (
                    <img
                      className="inline-avatar"
                      src={el.avatar}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="inline-avatar"
                      src="/images/ninja-profile.png"
                      alt="avatar"
                    />
                  )}
                  <p>{el.name}</p>
                  <p>{el.codeLanguage}</p>
                  <img
                    className="inline-level"
                    src={`/images/${el?.level?.toLowerCase()}.png`}
                    alt="level"
                  />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default DashboardDetails;
