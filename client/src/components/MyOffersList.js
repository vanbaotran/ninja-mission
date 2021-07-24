import React from 'react';
import getOfferList from './service'
class MyOffersList extends React.Component{
  state ={
    offerList:[]
  }
  componentDidMount(){
    getOfferList(this.props.currentUser._id)
    .then(offersFromDB=>{
      this.setState({
        offerList:offersFromDB
      })
      console.log(this.state.offerList)
    })
    .catch(err=>console.log(err))
  }
  render(){
    return (
      <div>
    {this.state.offerList.map((offer)=>{
      return <li key={offer._id}>{offer.offerName}</li>
    })}
      </div>
    )
  }
}
export default MyOffersList;