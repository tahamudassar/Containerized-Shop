import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { setLoggedIn } from '../store/slices/cartSlice'; // Import setLoggedIn action
import { Button, Checkbox, Form, Input } from 'antd'; // Import Ant Design components

export default function SignIn() {
  const [response, setResponse] = useState(null); // Store server response status or messages
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',  // Include credentials in the request
      });
      if (response.status === 200) {
        const data = await response.json(); // Parse the server response if needed
        setResponse('Login successful!');
        localStorage.setItem('Accesstoken', data.access);
        dispatch(setLoggedIn(true)); // Set loggedIn to true
        navigate('/'); // Redirect to the home page
      } else {
        const errorData = await response.json();
        setResponse(`Failed: ${errorData.non_field_errors || 'Unknown error'}`);
        console.log('Error', errorData);
      }
    } catch (error) {
      setResponse(error.message || error);
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div style={{ textAlign: 'center', marginTop: '-20px', marginLeft: '-100px' }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
          
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {response && <p>{response}</p>} {/* Display server or validation messages */}
    </div>
  );
}
