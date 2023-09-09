import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  
  static defaultProps={
      country:'in',
      pageSize:9,
      category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
   articles = []
    
   capitalizeFLetter(string) {
 return string[0].toUpperCase() +
        string.slice(1);}
  constructor(props){
    super(props);
    this.state={
      articles:this.articles,
      loading:false,
      page:1,
      totalResults:0,
      totalpages:0
    }
    document.title=`${this.capitalizeFLetter(this.props.category)} - DailyDigest`
  }
 


  async componentDidMount(){
    this.props.setProgress(0)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    this.props.setProgress(20)
    let data=await fetch(url)
    this.props.setProgress(50)
    let parsedData=await data.json()
    this.props.setProgress(75)
    // console.log(parsedData.articles)
   
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,totalpages:Math.ceil(this.state.totalResults/this.props.pageSize),loading:false
  })
  this.props.setProgress(100)
  }

  // handlePrev=async ()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d0c09f86aa242448bdb54b5c62611f5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //   this.setState({loading:true})
  //   let data=await fetch(url)
  //   let parsedData=await data.json()
  //   this.setState({articles:parsedData.articles,loading:false})
  //   this.setState({page:this.state.page-1})
   
  // }
  
  // handleNext=async ()=>{
  
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d0c09f86aa242448bdb54b5c62611f5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //   this.setState({loading:true})
  //   let data=await fetch(url)
  //   let parsedData=await data.json()
  //   this.setState({articles:parsedData.articles,loading:false})
  //   this.setState({page:this.state.page+1})
    
    
  // }
  fetchData = async() => {
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url)
    let parsedData=await data.json()
    this.setState({articles:this.state.articles.concat(parsedData.articles),loading:false})
    
  };
  render() {
    
   
    return (


      <div className="container my-5">
      <h1 className='text-center'>DailyDigest - Top {this.capitalizeFLetter(this.props.category)} Headlines</h1>
      <div className="text-center">
      {this.state.loading && <Loading/>}
      </div>

    <InfiniteScroll
  dataLength={this.state.articles.length} //This is important field to render the next data
  next={this.fetchData}
  hasMore={this.state.articles.length!==this.state.totalResults}
  loader={  <div className="fixed-bottom text-center mb-3">
      {this.state.loading && <Loading/>}
  </div>}
>

  </InfiniteScroll>
      
        
        
        <div className="row">
          {this.state.articles.map((element)=>{
              
               return  element.url && <div className="col-md-4 my-3" key={element.url}>
                
               <NewsItem title={element.title && element.title.length>70?element.title.slice(0,70):element.title} description={element.description && element.description.length>88?element.description.slice(0,88):element.description} imageUrl={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
               url={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}
               />
               </div>
          })}
          
       
        </div>
        {/* <div className='d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button type="button" disabled={this.state.totalpages<=this.state.page} class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News
