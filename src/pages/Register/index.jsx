import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Input } from "antd";
import { RegisterUser } from '../../calls/users';
import { message } from 'antd';

function Register() {

    const onFinish = async (values) => {
        console.log("Form for register page is submitted");
        const response = await RegisterUser(values);
        console.log(response);
        if(response.status == "201") {
            message.success("You are registered successfully! Please login to continue")
            // window.location.href = "/login"
        } else {
            message.error(response.data.message)
        }
    }

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Register to BookMyShow</h1>
                    </section>

                    <section className="right-section">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Name"
                                htmlFor="name"
                                name="name"
                                className="d-block"
                                
                                rules={[{required: true, message: "Name is required"}]}
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"

                                ></Input>
                            </Form.Item>


                            <Form.Item
                                label="UserId"
                                htmlFor="userId"
                                name="userId"
                                className="d-block"

                                rules={[{required: true, message: "UserId is required"}]}
                            >
                                <Input
                                    id="userId"
                                    type="text"
                                    placeholder="Enter your UserId"

                                ></Input>
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                htmlFor="email"
                                name="email"
                                className="d-block"
                                rules={[{required: true, message: "Email is required"}]}
                            >
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your Email"

                                ></Input>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                htmlFor="password"
                                name="password"
                                className="d-block"
                                rules={[{required: true, message: "Password is required"}]}
                            >
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your Password"

                                ></Input>
                            </Form.Item>

                            <Form.Item className="d-block">
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{fontSize: "1rem", fontWeight: "600"}}
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p>
                                Already a user? <Link to="/login">Login now</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
        </>
    )
}

export default Register