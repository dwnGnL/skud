import React,{Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import './menu.css';
// import {Link} from 'react-router-dom';
export default class Menus extends Component{

    state={
        msg:""
    }


    onSubmit=  (event)=>{
        
        // this.setState({
        //     buttonText:"Отправка...",
        //     inputDisabled:true
        // })
        // event.preventDefault();
        let formData = new FormData();
        // let files=[]
        const files = event[0]
        console.log(files)
        formData.append("file",files)
            
     
         fetch('http://localhost:8080/',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                msg:res.msg
            })
                console.log(res)
        })
        .catch(()=>{
            console.log("dsadsa")
            this.setState({
                msg:"Произошла ошибка..."
            })
        })
        
    }


    render(){
        return(
            <Menu pageWrapId={ "page-wrap" }>
                <main id="page-wrap">
                    {/* <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a className="menu-item--small" href="">Settings</a> */}
                    <ul>
                        <a href='/user/:'><li className="menu-item">Общая таблица</li></a>
                        <a href='/users'><li className="menu-item">Все сотрудники</li></a>
                        
                    </ul>
                   
                    <div className="custom-file">
                        <input type="file" name="files" onChange={(e)=>this.onSubmit(e.target.files)} id="file" className="custom-file-input"/>
                        <label htmlFor="file" className="custom-file-label">Добавить отчет</label>
                        <p>{this.state.msg}</p>
                    </div>

                </main>
          </Menu>
        )
    }
}
