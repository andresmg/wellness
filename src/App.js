import React from 'react'
import {Route, Switch} from 'react-router-dom'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import Home from './components/Pages/Home/Home'
import NotFound from './components/Pages/NotFound/NotFound'

function App() {

  return (
    <div className="App">
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
      {/* <Footer /> */}
    </div>
  )
}

export default App

