import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import deleteUserAction from '../../actions/userManagement/deleteUser.js';
import EditUserRole from './editUsersRole.component';

const SingleUserComponent = ({user, deleteUser, props, change}) => {
  return (
      <tr className="hoverable">
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>
          {
            (user.roleId !== 1) ?
              <select style={{ display: 'block' }} onChange={(e) => change(e, user.id)} id="selectRole">
                {
                  [...props.roles].reverse().map(role => <option value={role.id} key={role.id}>{role.title}</option>)
                }
              </select>
              :
              ''
          }

        </td>
        <td>{user.createdAt.slice(0, 10)}</td>
        <td>{user.updatedAt.slice(0, 10)}</td>
        <td><a className="red-text" href="#" onClick={() => deleteUser(user.id)} > <i className="material-icons">delete</i></a></td>
    </tr >
  );
}

export default class allUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      change: 1,
      users: [],
      roles: []
    }
    this.change = this.change.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users){
      this.setState({
        users: nextProps.users,
        roles: nextProps.roles
      });
    }
  }

  change(e, id) {
    this.setState({ change: e.target.value });
    this.props.updateUser({ roleId: e.target.value }, id);
  }

  deleteUser(userId){
    this.props.deleteUser(userId);
    Materialize.toast('User deleted!', 3000);
  }
  render(){
    return (
      <div>
        <table className="bordered  responsive" id="allUsersTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created date</th>
              <th>Updated date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.users ? this.state.users.users.map(user =>
              <SingleUserComponent user={user} key={user.id} deleteUser={this.deleteUser} props={this.props} change={this.change}/>
            ) : <div/>}
          </tbody>
        </table>
      </div>
    )
  };
}

