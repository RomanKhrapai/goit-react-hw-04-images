import {React, Component } from "react";
import PropTypes from 'prop-types'

import {Layout} from './Layout.styles'
import {SearchForm} from './SearchForm.styled'
import {ButtonSearch} from './ButtonSearch.styles'
import {Label} from "./Label.styles";
import {Input} from './Input.styles'
 
class Searchbar extends Component {
state = {
    value:'',
}

handleChange = evt => {
  const { value } = evt.target;
  this.setState({ value:value });
};

handleSubmit = evt => {
  evt.preventDefault();
  const value =this.state.value.trim();
  if(!value){
    this.reset(); 
    return
  }
this.props.onSubmit(value);
 this.reset();
};

reset = () => {
  this.setState({ value: '' });
};

render(){
  const {handleSubmit,handleChange} = this;
return (
  <Layout>
  <SearchForm onSubmit={handleSubmit}>
    <ButtonSearch 
    type="submit" 
    >
      <Label >Search</Label>
    </ButtonSearch>

    <Input
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.value}
      onChange={handleChange}
    />
  </SearchForm>
</Layout>  
)
}
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;
