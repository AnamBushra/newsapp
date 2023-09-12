
import './App.css';
import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


const App =()=> {
  let pageSize=9;
  
  const [progress,setProgress] = useState(0)
 
  let apikey=process.env.REACT_APP_API
  
    
    return (
      <div>
        <BrowserRouter>

        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={setProgress(0)}
      />
          <Navbar />
          <Routes>
            <Route path='/' element={<News  setProgress={setProgress} apikey={apikey}  key="general" country="in" category="general" pageSize={pageSize} />}></Route>
            <Route path='/general' element={<News  setProgress={setProgress} apikey={apikey} key="general" country="in" category="general" pageSize={pageSize} />}></Route>
            <Route path='/business' element={<News  setProgress={setProgress} apikey={apikey} key="business" country="in" category="business" pageSize={pageSize} />}></Route>
            <Route path='/sports' element={<News setProgress={setProgress} apikey={apikey} key="sports"  country="in" category="sports" pageSize={pageSize} />}></Route>
            <Route path='/technology' element={<News setProgress={setProgress} apikey={apikey}  key="technology" country="in" category="technology" pageSize={pageSize} />}></Route>
            <Route path='/science' element={<News  setProgress={setProgress} apikey={apikey} key="science" country="in" category="science" pageSize={pageSize} />}></Route>
            <Route path='/health' element={<News  setProgress={setProgress} apikey={apikey} key="health" country="in" category="health" pageSize={pageSize} />}></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress} apikey={apikey} key="entertainment"  country="in" category="entertainment" pageSize={pageSize} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

export default App;

