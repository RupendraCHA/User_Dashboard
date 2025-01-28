// Importing hooks to fetching data when website (with useEffect Hook) runs and defining variables (with useState Hook)
import React, { useState, useEffect } from 'react';

// Importing axios for handling API request
import axios from 'axios';

// Importing Predefined Classes from AntDesign for making UI More responsive and interacting
import "./App.css"
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  notification,
} from 'antd';


// Import Icons for enabling user Friendliness
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


// JSONPlaceholder URL For getting the user data and interaction while making API Requests
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  // Function to getting all the users Data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setUsers(data);
    } catch (error) {
      notification.error({ message: 'Error fetching users.' });
    } finally {
      setLoading(false);
    }
  };

  // Delete user function to remove User from the list
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
      notification.success({ message: 'User deleted successfully.' });
    } catch (error) {
      notification.error({ message: 'Error deleting user.' });
    }
  };

  // Function for Adding or Updating/Editing user details into the Application
  const handleAddOrEdit = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentUser.id}`, values);
        setUsers(users.map(user => user.id === currentUser.id ? { ...currentUser, ...values } : user));
        notification.success({ message: 'User updated successfully.' });
      } else {
        const maxId = users.length ? Math.max(...users.map(user => Number(user.id) || 0)) : 0;
        const newUser = {
          id: maxId + 1,
          ...values,
        };
        const { data } = await axios.post(API_URL, newUser);
        setUsers([...users, { ...data, id: newUser.id }]);
        notification.success({ message: 'User added successfully.' });
      }
    } catch (error) {
      notification.error({ message: 'Error saving user.' });
    } finally {
      setIsModalOpen(false);
      setCurrentUser(null);
      setIsEditing(false);
    }
  };


  // Function to handle Add user details modal
  const openAddModal = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Function for handling edit user details Modal
  const openEditModal = (user) => {
    setCurrentUser({
      ...user,
      company: { name: user.company?.name || '' },
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };


  // UseEffect Hook for loading/Fetching all the Users data when application starts running
  useEffect(() => {
    fetchUsers();
  }, []);


  // Users Dashboard Table filed Values and buttons for interactions
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center', responsive: ['md'] },
    { title: 'Name', dataIndex: 'name', key: 'name', align: 'center' },
    { title: 'Email', dataIndex: 'email', key: 'email', align: 'center' },
    { title: 'Department', dataIndex: 'company', key: 'company', align: 'center', render: (company) => company?.name || 'N/A', responsive: ['md'] },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => openEditModal(record)}  // This onClick event edit/update the user details
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}  // This onClick event deletes the user from the list
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='user-dashboard-container'>
      <h1 className='user-dashboard-heading'>User Management Dashboard</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={openAddModal} // This onClick opens Modal to create a new User
        className='add-users-button'
      >
        Add User
      </Button>

      <Table  // Table for displaying users data
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: 800 }}
        className='user-dashboard-table'
      />

      <Modal
        title={isEditing ? 'Edit User' : 'Add User'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          initialValues={currentUser || { name: '', email: '', company: { name: '' } }}
          onFinish={handleAddOrEdit}
          layout="vertical"
          key={currentUser ? currentUser.id : 'new'}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name!' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name={['company', 'name']}
            label="Department"
          >
            <Input placeholder="Enter department" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className='update-or-add-button'>
              {isEditing ? 'Update' : 'Add'} User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
