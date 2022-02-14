import {useState } from "react";

import {AppContainer} from './AppContainer.styles'
import Gallery from "./Gallery";
import Searchbar from "./Searchbar";

export function App (){
  const [searchText,setsearchText]= useState('')

 return (
    <AppContainer>
      <Searchbar
       onSubmit={setsearchText}
       >
      </Searchbar>
    <Gallery searchText={searchText}/>
    </AppContainer >
  ); 

}
