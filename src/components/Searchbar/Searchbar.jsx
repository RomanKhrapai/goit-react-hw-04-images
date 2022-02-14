import {useState } from "react";
import PropTypes from 'prop-types'

import {Layout} from './Layout.styles'
import {SearchForm} from './SearchForm.styled'
import {ButtonSearch} from './ButtonSearch.styles'
import {Label} from "./Label.styles";
import {Input} from './Input.styles'
 
function Searchbar ({onSubmit}) {
  const [value, setValue] = useState('');

  const handleChange = evt => {
  const { value } = evt.target;
  setValue(value)
};

const handleSubmit = evt => {
  evt.preventDefault();
  const strValue = value.trim();
  if(!strValue){
    reset(); 
    return
  }
  onSubmit(strValue);
 reset();
};

const reset = () => {
  setValue('');
};


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
      value={value}
      onChange={handleChange}
    />
  </SearchForm>
</Layout>  
)
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;
