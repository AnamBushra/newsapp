import React, { Component } from 'react'
const NewsItem =(props)=> {
 
    let {title,description,imageUrl,url,publishedAt,author,source}=props
    return (
      <div>
          <div className="card h-100" >
            <div className="d-flex" style={{justifyContent:"flex-end",position:"absolute",right:"0"}}>
          <span className="badge rounded-pill text-bg-danger" >{source}</span></div>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text"><small className='text-muted'>By {author?author:"Anonymous"} at {new Date(publishedAt).toGMTString()}</small></p>
    <p className="card-text">{description}...</p>
    <a href={url} className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }

export default NewsItem
