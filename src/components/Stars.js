
import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";


 const Stars = ({ star }) => {
  // console.log(star)
 const Rating= Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    console.log(number, index)
    const style={color:"#ffa534"}
    return (
      <span key={index}>
      
        {star >= index + 1 ? (
          <FaStar style={style}/>
        ) : star >= number ? (
          <FaStarHalfStroke style={style}/>
        ) : (
          <CiStar />
        )}
       
      </span>
    );
  });
 
  return(
    <>
{Rating}
    </>

  ) ;
};
  
 export default Stars
