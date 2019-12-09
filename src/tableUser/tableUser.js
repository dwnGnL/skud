import React,{Component} from 'react';
import './tableUser.css';
import ReactTable from 'react-table';
// import "react-table/react-table.css";
import {CSVLink} from 'react-csv';





export default class Table extends Component{

    
    state={
        table:[],
        term:"",
        loading:true,
        ot:"",
        dos:"",
        click:false,
        nameofExcell:""
      }
    
      componentDidMount(){
        this.giveData();
      }

     

      giveData=()=>{
          const arr={
              date:this.props.data
            }
            
        fetch(`http://localhost:8080/employee/${this.props.idUser}`,{
        method:'POST',
        body:JSON.stringify(arr)
      })
      .then(res=>res.json())
      .then(res=>{
        // console.log(...res)
        // const [...data]=res;
        if (res===null){
          return
        }
        // this.setState({
        //   table:res,
        //   loading:false
        // })
        this.props.changeTable(res)
      })
      }

      Filter = ()=>{
        console.log(this.state.ot,this.state.dos)
        if (this.state.ot==="" || this.state.dos===""){
            alert("sds")
            return
        }
        this.setState({
            nameofExcell:`с ${this.state.ot} по ${this.state.dos}`
        })
        const promejutok={
            ot:this.state.ot,
            do:this.state.dos,
            nameOfTable:"allSkudFromExcel",
            id:this.props.idUser
        }
        
        this.props.Filter(promejutok,"filter")
    }



    // change (id){
    //     alert(id);
    // }

    // getTrProps=(state,rowInfo,column)=>{
    //             if (rowInfo){
    //                 return{
        
    //                     style:{
                            
    //                         background:rowInfo.row.Status === 0 ? null : "rgba(255,0,0,.1)"
    //                         }
                            
    //                 };
    //             }
    //    return {}
    // }


    render(){

      
        const {table,loading}=this.props;
       const {nameofExcell}=this.state

        const cvs=[]
        Array.from(table).forEach((file,index) =>{
            const d=new Date(file.Date)
                           const date=(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"  "+d.toLocaleTimeString())
            cvs.push({Department:file.Department,Employee:file.Employee,Subdivision:file.Subdivision,Position:file.Position,Personalnumber:file.Personalnumber,Way:file.Way,Date:date,Door:file.Door,Comment:file.Comment,Calculation:file.Calculation,Accessarea:file.Accessarea})
        })
        console.log(cvs)
        const header=[{
            label:"Фирма",key:"Department"
        },{
            label:"Отдел",key:"Subdivision"
        },{
            label:"ФИО",key:"Employee"
        },{
            label:"Должность",key:"Position"
        },{
            label:"Таб номер",key:"Personalnumber"
        },{
            label:"Дата",key:"Date"
        },{
            label:"Направление",key:"Way"
        },{
            label:"Дверь",key:"Door"
        },{
            label:"Коментарий",key:"Comment"
        },{
            label:"Расчет ведется",key:"Calculation"
        },{
            label:"Зона доступа",key:"Accessarea"
        }]
 
        
        // alert(this.state.table.Employee)
        return(
            <div>
                <div className="range bg-dark">
                    <input type="date" onChange={(event)=>this.setState({ot:event.target.value})} className="form-control" name="" id=""/> -
                    <input type="date" className="form-control" name="" onChange={(event)=>this.setState({dos:event.target.value})} id=""/>
                    <button onClick={this.Filter} className="btn btn-outline-secondary">Фильтр</button>
                    <button className="btn btn-outline-success skachat">
                        <CSVLink filename={`Отчет ${nameofExcell}`} separator={";"} data={cvs} headers={header} >Download</CSVLink>
                    </button>
                </div>
                {/* <p>{name.Employee}</p> */}
            <ReactTable
            data={table}
            loading={loading}
                columns={[
                    {
                        Header:"Фирма",
                        accessor:"Department"
                    },
                    {
                        Header:"ФИО",
                        accessor:"Employee"
                    },
                    {
                        Header:"Отдел",
                        accessor:"Subdivision"
                    },
                    {
                        Header:"Должность",
                        accessor:"Position"
                    },
                    {
                        Header:"Таб номер",
                        accessor:"Personalnumber"
                    },
                    {
                        Header:"Направление",
                        accessor:"Way"
                    },
                    {
                        Header:"Дата",
                        accessor:"Date",
                        Cell: props =>{ 
                            const d=new Date(props.value)
                            return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"  "+d.toLocaleTimeString())
                        }
                    },
                    {
                        Header:"Дверь",
                        accessor:"Door"
                    },
                    {
                        Header:"Коментарий",
                        accessor:"Comment"
                    },
                    {
                        Header:"Расчет ведется",
                        accessor:"Calculation"
                    }
                    ,
                    {
                        Header:"Зона доступа",
                        accessor:"Accessarea"
                    }
                ]}
                defaultPageSize={15}
                className="-striped -highlight"
                // getTdProps = {this.getTrProps}
                pageSizeOptions={[15,25,50,100]}
            />
           
         


            </div>
        )
    }
}