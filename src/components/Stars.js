
import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

 const Stars = ({ star }) => {
  console.log(star)
  Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {star >= index + 1 ? (
          <FaStar />
        ) : star >= number ? (
          <FaStarHalfStroke />
        ) : (
          <CiStar />
        )}
      </span>
    );
  });
  return(
    <div>
{Stars}
    </div>

  ) ;
};
  
 export default Stars
