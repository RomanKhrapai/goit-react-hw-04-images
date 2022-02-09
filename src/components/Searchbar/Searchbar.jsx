import {React, Component } from "react";

import {Layout} from './Layout.styles'
import {SearchForm} from './SearchForm.styled'
import {ButtonSearch} from './ButtonSearch.styles'
import {Label} from "./Label.styles";
import {Input} from './Input.styles'
 
class Searchbar extends Component {
state = {
    inputValue:'',
}
render(){
return (
  <Layout>
  <SearchForm class1="form">
    <ButtonSearch type="submit" class1="button">
      <Label class1="button-label">Search</Label>
    </ButtonSearch>

    <Input
      class1="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</Layout>  
)
}
}


export default Searchbar;
