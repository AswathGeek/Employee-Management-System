import "./PostUser.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const Postuser = () => {
    const [formData, setformData] = useState({
        name:"",
        email:"",
        phone: "",
        department:""
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformData({
            ...formData,
            [name]:value,
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee created:", data);
            navigate("/")
        } catch (error) {
            console.log("Error creating employee:", error.message); 
        }
    }
    return (
        <>
            <div className="center-form">
                <h1>
                    Post new Employee
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="name" placeholder="Enter name" Value={formData.name} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="email" name="email" placeholder="Enter email" Value={formData.email} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="phone" placeholder="Enter phone" Value={formData.phone} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="department" placeholder="Enter Department" Value={formData.department} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" classname="w-100">Post Employee</Button>
                </Form>
            </div>
        </>
    )
}

export default Postuser;