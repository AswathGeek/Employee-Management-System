import './Updateuser.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setformData(data);
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        }
        fetchEmployee();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application",
                },
                body: JSON.stringify(formData)
                
            });
            const data = await response.json();
            console.log("User update:", data);
            navigate(`/`);
        } catch (error)
        {
            console.error("Error updating user:", error.message);
        }
    }
    
    
    return (
        <>
            <div className="center-form">
                <h1>
                    Edit Employee
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
export default UpdateUser;