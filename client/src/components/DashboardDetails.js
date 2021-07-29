import React from "react";
import service from "./service";

class DashboardDetails extends React.Component {
  state = {
    jobPost: "",
    candidateIdList: [],
    candidateList: [],
    query: "",
    sortingLevel:false
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
  sortByLevel = () =>{
    let ranking = { 
      Warrior: 1,
      Ninja: 2,
      Samurai: 3,
      Sensei: 4
    }
    let sortedList = [...this.state.candidateList].sort((a,b)=> ranking[`${b.level}`] - ranking[`${a.level}`])
    if (this.state.sortingLevel===false){
       this.setState({ 
        candidateList:sortedList,
        sortingLevel:true
      })
    } else {
       this.setState({ 
        sortingLevel:false
      })
    }
   
  }
  // getSinglePost = async () => {
  //   try {
  //     let jobpost = await service.get(`/posts/${this.props.match.params.id}`)
    
  //     let candidatelist = await jobpost.data.applicationId.candidateId.map(async (id) => {
  //         return await service.get(`/users/${id}`).data
  //         });
  //           console.log(candidatelist)
  //       this.setState({
  //         jobPost: jobpost.data.offerName,
  //         candidateList: candidatelist,
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  getSinglePost = () => {
    service
      .get(`/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          jobPost: response.data.offerName,
          candidateIdList: response.data.applicationId.candidateId,
        });
        this.state.candidateIdList.map((id) => this.getCandidateData(id));
        console.log('thepost',response.data)
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
      console.log(this.state.candidateList)
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
          <button  className="btn sort">date</button>
          <button className="btn sort">accuracy</button>
          <button onClick={()=>this.sortByLevel()} className="btn sort">exp level</button>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <label>Code Languages </label>
          <input
            onChange={this.handleChange}
            name="query"
            value={this.state.query}
          />
            <img
              className="icon-search"
              src="/images/icons/search.png"
              alt="search"
            />
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
