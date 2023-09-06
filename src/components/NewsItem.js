import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,url,publishedAt,author,source}=this.props
    return (
      <div>
          <div className="card" >
          <span class="badge position-absolute top-0 translate-middle roounded-pill text-bg-warning" style={{left:'90%' , zIndex:'1'}}>{source}</span>
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
}

export default NewsItem
