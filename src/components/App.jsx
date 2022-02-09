import {React, Component } from "react";

import {AppContainer} from './AppContainer.styles'
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import {api} from '../services/api'


class App extends Component{
state = {
  searchText : '',
  data:[],
}

onSudmit = data => {
  this.setState({
    searchText: data
  }
 )
}

 fetch = async (page,search)=>{
  try {
    const data = api.fetchArticlesWithQuery(page,search);

  data.then ((data)=>{
    this.setState({ data });
    console.log(data);
    return data;
  })
    
  } catch (error) {
    this.setState({ error });
  } finally {
    this.setState({ isLoading: false });
  }
}
componentDidMount() {


console.log(this.fetch(1,"cat")); 


}

render(){



 return (
    <AppContainer>
      <Searchbar>
        onSubmit={this.onSudmit}
      </Searchbar>
      <ImageGallery>
        data={this.data}
      </ImageGallery>
    </AppContainer>
  ); 
}
}

export default App;