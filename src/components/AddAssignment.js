import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'


class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '',  dueDate: '', course_id: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };
  

    handleChange = (event) => {
      const value = event.target.value;
      this.setState({
        ...this.state,
        [event.target.name]: value
      });
    }

    handleSubmit = ( ) => {
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/addassignment` , 
          {  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': token }, 
            body: JSON.stringify({name:this.state.name, dueDate:new Date(this.state.dueDate), course_id:this.state.course_id})
          } )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment Successfully Added", {
            position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Assignment Add Failed", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Assignment Add Failed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
  }; 
  
  render() {

    return (
        <div align="left" >
          <h4>Add a New Assignment </h4>
            <form>
              <label>
                Assignment Name
              </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
            </form>
            <form>
              <label>
                Due Date
              </label>
              <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChange}/>
            </form>
            <form>
              <label>
                Course ID
              </label>
              <input type="text" name="course_id" value={this.state.course_id} onChange={this.handleChange}/>
            </form>
            <Button id="AddAssignment" variant="outlined" color="primary" style=  {{margin: 10}} onClick={this.handleSubmit} >
            Add Assignment
            </Button>
            <Button component={Link} to={{pathname:'/'}} 
                    variant="outlined" color="primary" style={{margin: 10}}>
              Home
            </Button>
          <ToastContainer autoClose={1500} /> 
        </div>
    )
  }
}  

export default AddAssignment;