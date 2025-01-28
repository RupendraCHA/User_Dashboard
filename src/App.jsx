import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  notification,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
      notification.success({ message: 'User deleted successfully.' });
    } catch (error) {
      notification.error({ message: 'Error deleting user.' });
    }
  };

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

  const openAddModal = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser({
      ...user,
      company: { name: user.company?.name || '' },
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center', responsive: ['md'] },
    { title: 'First Name', dataIndex: 'name', key: 'name', align: 'center' },
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
            onClick={() => openEditModal(record)} 
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
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
        onClick={openAddModal}
        className='add-users-button'
      >
        Add User
      </Button>
      <Table
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
