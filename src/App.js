
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize=8;
  state = {
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
 
  apikey=process.env.REACT_APP_API
  render() {
    
    return (
      <div>
        <BrowserRouter>

        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={setProgress(0)}
      />
          <Navbar />
          <Routes>
            <Route path='/' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="general" country="in" category="general" pageSize={this.pageSize} />}></Route>
            <Route path='/general' element={<News  setProgress={this.setProgress} apikey={this.apikey} key="general" country="in" category="general" pageSize={this.pageSize} />}></Route>
            <Route path='/business' element={<News  setProgress={this.setProgress} apikey={this.apikey} key="business" country="in" category="business" pageSize={this.pageSize} />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports"  country="in" category="sports" pageSize={this.pageSize} />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apikey={this.apikey}  key="technology" country="in" category="technology" pageSize={this.pageSize} />}></Route>
            <Route path='/science' element={<News  setProgress={this.setProgress} apikey={this.apikey} key="science" country="in" category="science" pageSize={this.pageSize} />}></Route>
            <Route path='/health' element={<News  setProgress={this.setProgress} apikey={this.apikey} key="health" country="in" category="health" pageSize={this.pageSize} />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment"  country="in" category="entertainment" pageSize={this.pageSize} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

