import React,{Component} from 'react';
import './search-panel.css'


export default class SearchPanel extends Component{
 
  search=(event)=>{
    this.props.onChange(event.target.value)
  }
  render(){
    // const { onChange } = this.props;
    
    return(
      <input className="search-input form-control" onChange={this.search} placeholder="search"/>
    )
  }

  
}

