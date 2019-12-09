import React,{Component} from 'react';
import Header from './header/header';
import Menus from './menu/menu';
import Table from './table/table';
import TableUsers from './tableUsers'
import TableUser from './tableUser/tableUser';
import "react-table/react-table.css";
import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom';

// import SearchPanel from './search-panel';
import './App.css';



export default class App extends Component {

  state={
    table:[],
    term:"",
    loading:true,
    id:null,
    date:""
  }

  // reload=()=>{
  //   console.log("запуск")
  //     this.giveData();
    
  // }

  giveData=()=>{
    console.log("запуск")
    fetch(`http://localhost:8080/`,{
    method:'GET',
  })
  .then(res=>res.json())
  .then(res=>{
    // console.log(...res)
    // const [...data]=res;
    if (res===null){
      return
    }
    this.setState({
      table:res,
      loading:false
    })
  })
  }

  giveUsers=()=>{
    fetch(`http://localhost:8080/getUsers`,{
    method:'GET',
  })
  .then(res=>res.json())
  .then(res=>{
    // console.log(...res)
    // const [...data]=res;
    if (res===null){
      return
    }
    this.setState({
      table:res,
      loading:false
    })
  })
  }


  search = (items,term) =>{
    if (term.length===0){
      return items;
    }
    return items.filter((item)=>{
      return item.Employee.toLowerCase().indexOf(term.toLowerCase())>-1;
    });
  }


  Filter = (promejutok,route)=>{
    console.log(promejutok)

this.setState({
  loading:true
})
    fetch(`http://localhost:8080/${route}`,{
        method:'POST',
        body:JSON.stringify(promejutok)
    })
    .then(res=>res.json())
    .then(res=>{
      if (res===null){
        this.setState({
          table:[],
          loading:false
        })
        return
      }
      
        this.setState({
          table:res,
          loading:false
        })
    })
    .catch(()=>{
      this.setState({
        loading:false
      })
    })
}

componentWillMount(){
  this.setState({
    date:localStorage.getItem("date")
  })
}

changeTable=(res)=>{
  // console.log("change"+"-------"+res)
  this.setState({
    table:res,
    loading:false
  })
}


  
startSearch=(term)=>{
  this.setState({term});
  console.log(term)
}

setDate=(date)=>{
  this.setState({
    date:date
  })
  localStorage.setItem("date",date)
  console.log(date)
}

  render(){
    const visibleItems =  this.search(this.state.table,this.state.term);
    const {loading,redirect}=this.state;

    const redirectBlock = redirect ? <Redirect to='/'/>:null;
    return (
      <React.Fragment>
        <Router>
        <Menus/>
        <Header redirect={this.redirectNull} reload={this.giveData} onChange={this.startSearch}/>
        {redirectBlock}
          <Route path='/' exact
           render={() => {
            // const { visibleItems, loading} = match.params;
            return <Table Filter={this.Filter} data={this.setDate}  loading={loading} reload={this.giveData} table={visibleItems} />
          }}/>

          <Route path='/user/:id'
           render={({ match }) => {
            const { id} = match.params;
            if (id===":"){
              localStorage.removeItem("date")
            }
            return <TableUser Filter={this.Filter} data={this.state.date} changeTable={this.changeTable} table={visibleItems} loading={loading} idUser={id} />
          }}/>

          <Route path='/users'  render={()=>{
            return <TableUsers reload={this.giveUsers}  loading={loading} table={visibleItems}/>
          }}/>
          
          {/* <TableUser /> */}
        </Router>
      </React.Fragment>
    );
  }
}


