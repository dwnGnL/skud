import React,{Component} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Modal from 'react-modal';
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      width                 : '400px',
      height                : '550px',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
  Modal.setAppElement('#root')

export default class TableUsers extends Component{

    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }

      state = {
        modalIsOpen: false,
        id:0,
        ot: moment(),
        dos:moment(),
        msg:"",
        comment:""
      }
  
      handleChangeOt = (ot) => {
        this.setState({
          ot
        });
        console.log(this.state.ot.toLocaleString())
      }

      componentDidMount(){
        this.props.reload();
      }

      handleChangeDo = (dos) => {
        this.setState({
          dos
        });
        console.log(moment)
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


      Submit=(e)=>{
        e.preventDefault();
            if ((this.state.dos.format("DD:MM:YYYY")!==this.state.ot.format("DD:MM:YYYY"))){
                this.setState({
                    msg:"Нужно выбрать в пределах одного дня"
                })
                return
            }

            if(this.state.dos<this.state.ot){
              this.setState({
                msg:"Второе время должно быть больше первого"
            })
            return
            }
            const time={
                id:this.state.id,
                ot:this.state.ot.format("YYYY-MM-DD HH:mm"),
                do:this.state.dos.format("YYYY-MM-DD HH:mm"),
                comment:this.state.comment
            }
            console.log(time)
            fetch(`http://192.168.43.139:8080/getUsers`,{
            method:'POST',
            body:JSON.stringify(time)
          })
          .then(res=>res.json())
          .then(res=>{
            // console.log(...res)
            // const [...data]=res;
            if (res===null){
              return
            }
            console.log(res)
            // this.setState({
            //   table:res,
            //   loading:false
            // })
            this.setState({
                msg:res.msg
            })
          })
          
        // this.setState({modalIsOpen: false});
    }

    changeComment=(comment)=>{
      this.setState({
        comment
      })
    }


    render(){

        const {table,loading}=this.props;
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
          };

        
        return(
            <div>
              
                <ReactTable
                data={table}
                loading={loading}
                    columns={[
                        {
                            Header:"ID",
                            accessor:"ID",
                        },
                        {
                            Header:"ФИО",
                            accessor:"Employee",
                        },
                        {
                            Header:"Статус",
                            accessor:"Status",
                            Cell:props=>{
                                switch(props.value){
                                  case "0":return <p style={{color:"green",fontWeight:"bold"}}>Работает</p>
                                  case "1":return <p style={{color:"red",fontWeight:"bold"}}>Не работает</p>
                                  case "2":return <p style={{color:"yellow",fontWeight:"bold"}}>Отпросился</p>
                                }
                            }
    
                        },
                        {
                            Header:"change",
                            accessor:"ID",
                            Cell: props => <button type="button" onClick={()=>this.openModal(props.value)} className="btn btn-success" >Изменить</button>
                        }
                    ]}
                    defaultPageSize={12}
                    className="-striped -highlight"
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
            <h2>Добавить время</h2>
         <form className="modals text-center" onSubmit={this.Submit}>
         <DatetimePickerTrigger
                        shortcuts={shortcuts} 
                        moment={this.state.ot}
                        onChange={this.handleChangeOt}>
                        <input type="text" className="form-control" value={this.state.ot.format('YYYY-MM-DD HH:mm')} readOnly />
                    </DatetimePickerTrigger>
                    <DatetimePickerTrigger
                        shortcuts={shortcuts} 
                        moment={this.state.dos}
                        onChange={this.handleChangeDo}>
                        <input type="text" className="form-control" value={this.state.dos.format('YYYY-MM-DD HH:mm')} readOnly />
                    </DatetimePickerTrigger>
                    <input type="text" className="form-control" onChange={(e)=>this.changeComment(e.target.value)} value={this.state.comment} placeholder="Коментарий..."/>
             <button type="submit" className="btn btn-secondary">Добавить</button>
             <button className="btn btn-danger" onClick={this.closeModal}>close</button>
             <p>{this.state.msg}</p>
         </form>
        </Modal>
      </div>


            </div>
        )
    }
}