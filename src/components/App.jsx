import {React, Component } from "react";

import {AppContainer} from './AppContainer.styles'
import Gallery from "./Gallery";
import Searchbar from "./Searchbar";





class App extends Component{
state = {
  searchText : '',
}

formSudmitHandler = value => {
  this.setState({
    searchText: value,
  }
 )
}

render(){
const {formSudmitHandler} = this;
const {searchText} = this.state;

 return (
    <AppContainer>
      <Searchbar
       onSubmit={formSudmitHandler}
       >
      </Searchbar>
    <Gallery searchText={searchText}/>
    </AppContainer >
  ); 
}
}

export default App;