import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import Intro from './Routes/Intro'

function App() {
  return (
    <Router basename='netflix-clone'>
      <Header />
      <Switch>
        <Route path="/tv*"><Tv /></Route>
        <Route path="/search"><Search /></Route>
        <Route path="/movies*"><Home /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
