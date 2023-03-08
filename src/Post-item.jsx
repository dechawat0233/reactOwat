import React from "react";
const PostItem = (props)=> {
    return(
        <>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
        </>
    )
}
export default PostItem;