import React from 'react'

function Rating(props){
    let rating = Math.round(props.children)
    let stars='';
    let star = '☆'
    let starFilled = '★'
    for (let i=0;i<rating;i++){
        stars+=starFilled;
    }
    for (let i=0;i<(5-rating);i++){
        stars+=star
    }

    return (
        <div className='show-rating'>
            {[...stars]}
        </div>
    )
}
export default Rating;