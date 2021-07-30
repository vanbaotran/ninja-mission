import React from "react";
import service from "./service";


class DashboardDetails extends React.Component {
  state = {
    jobPost: "",
    candidateList: [],
    query: "",
    jobCodeLanguages:[],
    sortingLevel:false,
    sortingAccuracy:false,
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
    //sort levels by using value of each level in decreasing order
    let sortedList = [...this.state.candidateList].sort((a,b)=> ranking[`${b.level}`] - ranking[`${a.level}`])
    if (this.state.sortingLevel===false){
       this.setState({ 
        candidateList:sortedList,
        sortingLevel:true,
        sortingAccuracy:false,
      })
      //if the button is not active then retrieve the page again to have original order
    } else {
      this.getSinglePost();
       this.setState({ 
        sortingLevel:false,
      })
    }
  }
  sortByAccuracy = () => {
    //sort by number of keywords matched in CodeLanguage 
    //codeLanguage=['JS','Python',...]
    let jobCodeLanguages = [...this.state.jobCodeLanguages]
    function matchCount(candidateCodeLanguagesArray){
      let matchedArray = jobCodeLanguages.filter(el=> candidateCodeLanguagesArray.includes(el))
      return matchedArray.length
    }
    let theList = [...this.state.candidateList]
    let sortedList = theList.sort((a,b)=> matchCount(b.codeLanguage)-matchCount(a.codeLanguage))
    if (this.state.sortingAccuracy===false){
      this.setState({
        sortingAccuracy:true,
        sortingLevel:false,
        candidateList:sortedList,
      }) 
    } else {
      this.getSinglePost();
      this.setState({ 
        sortingAccuracy:false,
      })
    }
  }
  getSinglePost = async () => {
    try {
    let jobPost = await service.get(`/posts/${this.props.match.params.id}`);
    let candidatesData = await service.get(
      `/applications/${jobPost.data.applicationId._id}/candidates`
    );
    this.setState({
      jobPost: jobPost.data.offerName,
      candidateList: candidatesData.data.candidateId,
      jobCodeLanguages:jobPost.data.codeLanguage
    });
      
    } catch (error) {
      console.log(error)
    }
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
    //CSS pushed button
    let divStyle1,divStyle2;
    let buttonOn = {backgroundColor:"#F6DA79", boxShadow: "0px 2px 2px"}
    if(this.state.sortingAccuracy) {
      divStyle1 = buttonOn;
      divStyle2 = {}
    } else if (this.state.sortingLevel) {
      divStyle2 = buttonOn;
      divStyle1 = {};
    } else {
      divStyle1 = {};
      divStyle2 = {}
    }
    return (
      <div className="dashboard-details">
        <div className='top-line flex-row blue-bg'>
          <img
            onClick={() => {
              this.props.history.push("/mydashboard");
            }}
            src="/images/icons/back.png"
            alt="back"
          />
          <h1 className="text-yellow">{this.state.jobPost}</h1>
          <img src='' alt=''/>
        </div>
        <div className="sort flex-row">
          <h4 className="text-red">Sort by</h4>
          <img src="/images/icons/sort.png" alt="sort" />
          <button onClick={()=>this.sortByAccuracy()}className="btn sort" style={divStyle1}>accuracy</button>
          <button onClick={()=>this.sortByLevel()} style={divStyle2} className="btn sort">exp level</button>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <label>Code Languages </label>
          <div className='input-search flex-row'>
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
            </div>
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
                  {/* <p>{el.codeLanguage}</p> */}
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
