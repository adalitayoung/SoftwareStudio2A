import React from 'react';

import api from '../api';

import { AiOutlineEdit } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class AdminTeacherList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* user: props.location.state.user,*/
      teacherData: [],
      isLoading: false,
    };

    this.fetchTeacherList();
  }

  fetchTeacherList() {
    api.fetchUserData('Teacher', null).then((data) => {
      // need to change class model and check if the course is for that teacher
      // console.log(data)
      this.setState({ teacherData: data.data.userData });
      console.log(this.state.teacherData);
    });
  }

  /*editClass(user) {
        // event.preventDefault();
        console.log('edit')
        console.log(user)
    }
*/
  deleteUser(email) {
    api.deleteUser(email).then((data) => {
      console.log('delete');
      window.alert('This ' + email + 'is deleted!');
    });
  }

  teacher = async (event) => {
    // add function to redirect it to
    event.preventDefault();
  };

  student = async (event) => {
    // add function to redirect it to teacher page
    event.preventDefault();
    this.props.history.push({
      pathname: '/admin/AdminStudentList',
    });
  };

  addTeacher = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  updateRole(id, username) {
    this.props.history.push({
      pathname: '/admin/UpdateUserRole',
      state: { user_id: id, userName: username },
    });
  }

  renderTableData() {
    return this.state.teacherData.map((teacher, index) => {
      const { fullName, email, _id } = teacher; //destructuring
      return (
        <tr key={_id}>
          <td style={{ textAlign: 'center' }}>{fullName}</td>
          <td style={{ textAlign: 'center' }}>{email}</td>

          <td>
            <AiOutlineEdit onClick={() => this.updateRole(_id, fullName)} />
          </td>
          <td>
            <ImCross onClick={() => this.deleteUser(email)} />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='container scrollable'>
        <div className='row align-items-center'>
          <div className='col' style={{ marginTop: '10%' }}>
            <div className='row'>
              <div class='text-block'>
                <div className='box title-container'>
                  <h2 class='font-weight-light'></h2>
                  <div className='adminstfontgradon'>Hello, Admin</div>
                  <div className='adminstfontauto'>Add/Remove Teacher</div>
                </div>
              </div>
              <div className='box adminstbutton-container'>
                {/* <Link to='AdminStudentList'>
                  {' '} */}
                <button
                  type='button'
                  style={{
                    top: '445px',
                    left: '120px',
                    width: '180px',
                    height: '45px',
                    color: '#FFFFFFF',
                    background: '#4285F4',
                    borderRadius: '50px',
                    opacity: '1',
                    fontFamily: 'Helvetica',
                    fontSize: '15px',
                    display: 'block',
                    margin: '10%',
                  }}
                  className='btn btn-primary btn-block'
                  onClick={this.student}
                >
                  Student
                </button>{' '}
                {/* </Link> */}
              </div>
            </div>
            <div class='container scroll'>
              <div class='backgroundbox'>
                <div class='backgroundwhitebox'>
                  <table class='center'>
                    <tr>
                      <th
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '17px',
                          color: '#707070',
                          opacity: '1',
                        }}
                      >
                        Teacher Name
                      </th>
                      <th
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '17px',
                          color: '#707070',
                          opacity: '1',
                        }}
                      >
                        Teacher Email
                      </th>

                      <th></th>
                      <th></th>
                    </tr>
                    <tbody>{this.renderTableData()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTeacherList;
