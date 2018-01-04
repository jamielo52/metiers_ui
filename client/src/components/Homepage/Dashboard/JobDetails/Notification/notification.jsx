import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Link, Switch, Route } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import './notification.css';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NotificationDateTime: moment(),
      NotificationMessage: "",
      NotificationName: "",
      appcheckbox: false,
      emailcheckbox: false,
      jobId: this.props.jobId,
      notifications: [],
      errors: false,
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAddNotifications = this.handleAddNotifications.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
    console.log('STATE: ', this.state)
{      console.log('this.state.NotificationDateTime', this.state.NotificationDateTime)}
  }

  handleDateChange(e) {
    this.setState({
      NotificationDateTime: e,
    });
    console.log('STATE: ', this.state)
  }

  handleAddNotifications(){
    if(this.state.NotificationMessage === "" && this.state.NotificationName === "" ){
      this.setState({errors: true});
    } else {
    axios.post('http://localhost:3003/addNotification', {
      jobId: this.props.jobId,
        NotificationDateTime: this.state.NotificationDateTime.format('YYYY/MM/DD HH:mm:ss'),
        NotificationMessage: this.state.NotificationMessage,
        NotificationName: this.state.NotificationName
      }).then((res) => {
        console.log('res', res);
      });
    }
  }

  componentDidMount(){
    axios.post('http://localhost:3003/getNotifications', {
      jobId: this.props.jobId,
    }).then((res) => {
      console.log('response', res.data);
      this.setState({notifications: res.data});
    })
  }


  render() {
    return (
    <div>
      <div className="container push-top">
        <div className="row">
          <div className="offset-md-1 col-md-10 offset-md-1">
            <h3>Add a Notification</h3>
            <label>Notification Date &amp; Time</label> <span className="must-have">*</span>
            
            <DatePicker
              className="form-control date_time_picker"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              selected={this.state.NotificationDateTime}
              dateFormat="LLL"
              onChange={this.handleDateChange}
            />
          </div> 
        </div>
        <div className="row">
          <div className="offset-md-1 col-md-10 offset-md-1 push-top-sm">
            <label>Notification Title</label> <span className="must-have">*</span>
            <textarea className="form-control" name="NotificationName" placeholder="Title" onChange={this.handleUserInput}></textarea>
          </div>
          <div className="offset-md-1 col-md-10 offset-md-1 push-top-sm">
            <label>Notification Message</label> <span className="must-have">*</span>
            <textarea className="form-control" name="NotificationMessage" placeholder="Message" onChange={this.handleUserInput}></textarea>
          </div>
          <div className="offset-md-1 col-md-10 offset-md-1 push-top-sm">
            <button className="btn btn-primary" onClick={this.handleAddNotifications}>Save</button>
            { this.state.errors && <div className="alert alert-danger push-top-sm">Please enter a notification title, message, and future date &amp; time.</div> }
          </div>
          <div className="offset-md-1 col-md-10 offset-md-1 push-top">
          
          { JSON.stringify(this.state.notifications) === JSON.stringify([]) ? <h3>No Notifications Added</h3> : 
          <table className="table">
            <thead>
              <tr>
                <th>Notification Title</th>
                <th>Date</th>
                <th>Notification Message</th>
              </tr>
            </thead>
            <tbody>
                {this.state.notifications.map((notification) => {
                  return (
                    <tr key={notification.id}>
                      <td>{notification.name}</td>
                      <td>{notification.notifyOn}</td>
                      <td>{notification.notes}</td>
                    </tr>
                  );
                })
                }
            </tbody>
          </table>
          }
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Notification;