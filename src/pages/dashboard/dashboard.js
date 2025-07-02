import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap"; // Assuming you have react-bootstrap installed
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null); // State for displaying fetch errors
    const [loading, setLoading] = useState(true); // State for loading indicator
    const navigate = useNavigate();
    // Function to fetch employees
    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/employees");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            setEmployees(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching employees:", err.message);
            setError("Failed to load employees. Please try again later.");
        } finally {
            setLoading(false); // Always set loading to false after fetch attempt
        }
    };

    useEffect(() => {
        fetchEmployees(); // Initial fetch when component mounts
    }, []); // Empty dependency array means this runs once on mount

    // Function to handle employee deletion
    const handleDelete = async (employeeId) => {
        try {
            // FIX 1 & 2: Use backticks for template literals in URL
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE", // HTTP method should be "DELETE" (case-sensitive)
            });

            // FIX 2: Check if the response was successful
            if (response.ok) {
                console.log(`Employee with ID ${employeeId} deleted successfully`); // FIX 1: Use backticks
                // After successful deletion, re-fetch the list to update the UI
                fetchEmployees();
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to delete employee: ${response.status} - ${errorText}`);
            }
        } catch (err) {
            console.error("Error deleting employee:", err.message);
            setError(`Failed to delete employee: ${err.message}`); // Display error to user
        }
    };

    // Render loading state
    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <h2>Loading Employees...</h2>
            </Container>
        );
    }

    // Render error state
    if (error) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="text-danger">{error}</h2>
                <Button variant="primary" onClick={fetchEmployees}>Retry</Button> {/* Add a retry button */}
            </Container>
        );
    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Employees</h1>
                        {employees.length === 0 ? (
                            <p className="text-center">No employees found.</p>
                        ) : (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Department</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.phone}</td>
                                            <td>{employee.department}</td>
                                            {/* FIX 3: Removed Phone and Department data cells */}
                                            <td>
                                                <Button variant="outline-secondary" onClick={() =>handleUpdate(employee.id)} className="me-2">Update</Button>{" "}
                                                {/* Pass employee.id to handleDelete */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;