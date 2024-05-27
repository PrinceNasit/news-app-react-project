import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
      console.log("cdm");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=[YOUR_API_KEY]&page=1&pagesize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults })
  }
  prevclick=async ()=>{
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8c9a7d4bd8034cc1bc983b9229134aa5”&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles
      })
  }
  nextclick=async ()=>{
      console.log("Next");
      if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {
      }
      else {
          let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8c9a7d4bd8034cc1bc983b9229134aa5&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData);
          this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles
          })
      }
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className='mb-3 text-center'>My News - Top Headlines</h1>
        <div className="row">
    {this.state.articles.map((element)=>{
    return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title.slice(0, 45):""}
            description={element.description?element.description.slice(0, 88):""} ImageUrl={element.urlToImage}
            newsUrl={element.url} />
    </div>
    })}
</div>
<div className="container d-flex justify-content-between">
<button type="button" disabled={this.state.page<=1} onClick={this.prevclick} className="btn btn-primary">&larr; Previous</button>
<button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.nextclick}className="btn btn-primary">Next &rarr;</button>
</div>
      </div>
    )
  }
}

export default News
