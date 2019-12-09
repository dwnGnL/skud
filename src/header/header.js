import React,{Component} from 'react';
import './header.css';
import SearchPanel from '../search-panel';
import {Link} from 'react-router-dom';
// import './bootstrap.min.css';

export default class Header extends Component{

    state={
        newData:false
    }

    


    render(){
        // this.props
        return(
            <header className="sticky-top bg-dark text-white">
                <div className="header">
                <a href="/"><h2>Skud Controll</h2></a>
                    {/* <ul>
                        <li>HumoLab</li>
                    </ul> */}
                <div className="search">
                    <SearchPanel onChange={this.props.onChange}/>
                </div>
                </div>
            </header>
            
                
                
                  
        )
    }
}