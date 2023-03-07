import React from 'react'

function Comment() {
  // const Comment = (props) => {
  //   return (
  //     <div>
  //       <span>{props.data} form id:{props.userId}</span>
  //     </div>
  //   )
  // }
  const data = props.data
  const userId = props.userId
  console.log(props)
  return (
    <div>
      <span>{props.data} form id: {props.userId}</span>
    </div>
  )
}

export default Comment

// import React from "react";
// const Comment = ({userId,data}) =>{
//     return(
//         <div>
//             <span>{data} form id: {userId}</span>
//         </div>
//     )
// }

// export default Com