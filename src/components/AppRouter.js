import React from 'react'
import WrappedVideoPlayer from '../containers/WrappedVideoPlayer';
import WrappedVideoEditor from '../containers/WrappedVideoEditor';
import Header from "./Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const AppRouter = () => (
    <Router>
      <div>
        <Header/>
        <Route path="/" exact component={WrappedVideoPlayer}/>
        <Route path="/edit/" component={WrappedVideoEditor} />
      </div>
    </Router>
)

export default AppRouter