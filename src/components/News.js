import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //  const [totalpages,setTotalPages]=useState(0)

  const capitalizeFLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(75);
    // console.log(parsedData.articles)

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    // setTotalPages(Math.ceil(totalResults/props.pageSize))
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFLetter(props.category)} - DailyDigest`;
    updateNews();
  }, []);

  // handlePrev=async ()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d0c09f86aa242448bdb54b5c62611f5&page=${page-1}&pageSize=${props.pageSize}`
  //   setState({loading:true})
  //   let data=await fetch(url)
  //   let parsedData=await data.json()
  //   setState({articles:parsedData.articles,loading:false})
  //   setState({page:page-1})

  // }

  // handleNext=async ()=>{

  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d0c09f86aa242448bdb54b5c62611f5&page=${page+1}&pageSize=${props.pageSize}`
  //   setState({loading:true})
  //   let data=await fetch(url)
  //   let parsedData=await data.json()
  //   setState({articles:parsedData.articles,loading:false})
  //   setState({page:page+1})

  // }
  const fetchData = async () => {
  
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country
      }&category=${props.category}&apiKey=${props.apikey}&page=${page+1
      }&pageSize=${props.pageSize}`;
      setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        DailyDigest - Top {capitalizeFLetter(props.category)} Headlines
      </h1>
      <div className="text-center">{loading && <Loading />}</div>

      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={
          <div className="fixed-bottom text-center mb-3">
            {loading && <Loading />}
          </div>
        }
      ></InfiniteScroll>

      <div className="row">
        {articles.map((element) => {
          return (
            element.url && (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={
                    element.title && element.title.length > 70
                      ? element.title.slice(0, 70)
                      : element.title
                  }
                  description={
                    element.description && element.description.length > 88
                      ? element.description.slice(0, 88)
                      : element.description
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
                  }
                  url={element.url}
                  publishedAt={element.publishedAt}
                  author={element.author}
                  source={element.source.name}
                />
              </div>
            )
          );
        })}
      </div>
      {/* <div className='d-flex justify-content-between'>
        <button type="button" disabled={page<=1} class="btn btn-dark" onClick={handlePrev}>&larr; Previous</button>
        <button type="button" disabled={totalpages<=page} class="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
