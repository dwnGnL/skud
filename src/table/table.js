import React,{Component} from 'react';
import './table.css';
import ReactTable from 'react-table';
// import "react-table/react-table.css";
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root')

export default class Table extends Component{

    constructor() {
        super();

        this.state = {
          modalIsOpen: false,
          id:0,
          ot:"",
          do:""
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }

      openModal(id) {
        this.setState({modalIsOpen: true,id});
      }

      afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
      }

      closeModal() {
        this.setState({modalIsOpen: false});
      }

      componentDidMount(){

        this.props.reload();
      }

      Filter = ()=>{
        console.log(this.state.ot,this.state.do)
        let ot=this.state.ot;
        let dos= this.state.do;
        if (dos===""){
          dos=ot
        }
        const promejutok={
            ot:ot,
            do:dos,
            nameOfTable:"mainTable"
        }
        this.props.Filter(promejutok,"filter")

    }
        // componentWillUnmount(){

        // }


    change (id){
        alert(id);
    }

    getTrProps=(state,rowInfo,column)=>{

      return {}
    }



    Submit=(e)=>{
        e.preventDefault();
        this.setState({modalIsOpen: false});
    }

    render(){

        const {table,loading}=this.props;

        return(
            <div>
                <div className="range bg-dark">
                    <input type="date" onChange={(event)=>this.setState({ot:event.target.value})} className="form-control" name="" id=""/> -
                    <input type="date" className="form-control" name="" onChange={(event)=>this.setState({do:event.target.value})} id=""/>
                    <button onClick={this.Filter} className="btn btn-outline-secondary">Фильтр</button>
                </div>
            <ReactTable
            data={table}
            loading={loading}
                columns={[
                    {
                        Header:"ФИО",
                        accessor:"Employee",
                        width:350,
                        Cell: (props,row)=>{
                          const url = `/user/:${props.value}`
                          return <Link to={url} ><p onClick={()=>this.props.data(props.original.Date)}>{props.value}</p></Link>
                        }
                    },
                    {
                        Header:"Сколько проработал",
                        accessor:"Hour",
                        Cell: props=>{
                           return(Math.trunc(props.value/60)+" ч "+props.value%60+" мин")
                        }
                    },
                    {
                        Header:"Дата",
                        accessor:"Date",
                        Cell: props =>{
                            const d=new Date(props.value)
                            return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())
                        }
                    },
                    {
                        Header:"Статус",
                        accessor:"Status",
                        Cell:props=>{
                            switch(props.value){
                              case 0:return <p style={{color:"red",fontWeight:"bold"}}>Отсутствовал</p>
                              case 1:return <p style={{color:"yellow",fontWeight:"bold"}}>Подозрительно</p>
                              case 2:return <p style={{color:"green",fontWeight:"bold"}}>Все ок</p>
                            }
                        }

                    },
                    // {
                    //     Header:"Таб №",
                    //     accessor:"Personalnumber"
                    // },
                    // {
                    //     Header:"Направление",
                    //     accessor:"Way"
                    // },
                    // {
                    //     Header:"Дверь",
                    //     accessor:"Door"
                    // },
                    // {
                    //     Header:"Коментарий",
                    //     accessor:"Comment"
                    // },
                    // {
                    //     Header:"Расчет ведется",
                    //     accessor:"Calculation"
                    // }
                    // ,
                    // {
                    //     Header:"Зона доступа",
                    //     accessor:"Accessarea"
                    // },
                    // {
                    //     Header:"change",
                    //     accessor:"Name",
                    //     Cell: props => <button type="button" onClick={()=>this.openModal(props.value)} className="btn btn-success" >Изменить</button>
                    // }
                ]}
                defaultPageSize={12}
                className="-striped -highlight"
                getTdProps = {this.getTrProps}
                pageSizeOptions={[10,15,25,50,100]}
            />

           <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className=""
          style={customStyles}
          contentLabel="Example Modal"
        >

         <form className="modals text-center" onSubmit={this.Submit}>
             <h2>{this.state.id}</h2>
             <input type="date" className="form-control" placeholder="Введите дату изменения"/>
             <input type="text" value={this.state.id} hidden className="form-control" placeholder="Введите дату изменения"/>
             <input type="text"  className="form-control" placeholder="Колличество часов"/>
             <textarea type="text"  className="form-control" placeholder="Комментарий">
             </textarea>
             <button type="submit" className="btn btn-secondary">Изменить</button>
             <button className="btn btn-danger" onClick={this.closeModal}>close</button>
         </form>
        </Modal>
      </div>


            </div>
        )
    }
}