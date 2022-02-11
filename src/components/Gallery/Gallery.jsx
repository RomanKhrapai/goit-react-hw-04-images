import {React, Component } from "react";
import PropTypes from 'prop-types'
import { ThreeDots } from  'react-loader-spinner'

import ImageGallery from "../ImageGallery";
import { ButtonLoadMore } from "../Button/ButtonLoadMore.styles";
import { BoxCenter } from "./BoxCenter.styles";
import api from '../../services/api'

class Gallery extends Component{
    state = {
      data:[],
      page:0,
      status:'idle',
      error:''
    }

    componentDidUpdate(prevProps){
        const {searchText} = this.props
        if(prevProps.searchText!==searchText){
          this.fetch(0,searchText)
          this.setState({
            data:[],
            status:'panding',
          })
        }
    }

    fetch = async (page,search)=>{
        page = page + 1;
       try {
         const data = await api.fetchArticlesWithQuery(page,search);
        if(data.totalHits===0){
            this.setState({status:'resolvedZero'});
            return
        }
         const newStatus = data.totalHits / page<=12 ? 'resolvedLast':'resolved';
           this.setState(prevState => ({
            status: newStatus,
             data: [...prevState.data,...data.hits],
             page: page
             }))

       } catch (error) {
         this.setState({
             status: 'rejected',
             error:'Error server!!!'
             });
       } 
     }
 
     LoadMore = ()=>{
        this.fetch(this.state.page,this.props.searchText);
        this.setState({
            status:'resolvedPending',
          })
       }

    render(){
        const {LoadMore} = this;
        const {data,status,error} = this.state;
if(status==='idle'){
   return <></>
}
if(status==='panding'){
    return (
        <BoxCenter>
            <ThreeDots color="#00BFFF" height={80} width={80} />
        </BoxCenter>
    )
}
if(status==='resolvedLast'){
    return (
        <ImageGallery  data={data} />
    )
}
if(status==='resolvedZero'){
    return  <BoxCenter><h1>Nothing was found for your query!</h1></BoxCenter>
}

if(status==='resolvedPending'){
    return (<>
        <ImageGallery  data={data} />
        <BoxCenter>
            <ThreeDots color="#00BFFF" height={80} width={80} />
        </BoxCenter>    
   </> )
}
if(status==='resolved'){
    return (<>
        <ImageGallery  data={data} />
        <BoxCenter>
            <ButtonLoadMore type="button" onClick={LoadMore}>
                Load more
            </ButtonLoadMore>
       </BoxCenter>
   </> )
}
if(status==='rejected'){
    return <BoxCenter><h1>{error}</h1></BoxCenter>
}
}
}

Gallery.propTypes = {
    searchText: PropTypes.string.isRequired
  }

    export default Gallery;