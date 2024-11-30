import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Nav, Row, Spinner } from 'react-bootstrap'
import styles from './login.module.scss'
import { LoginService } from '../register/signup.service';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
// import io from "socket.io-client";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password:""
      });
      const [loading,setLoading]=useState(false);
      const cookies = new Cookies(null, { path: '/' });
      const [validated, setValidated] = useState(false);
      const navigate=useNavigate();

      useEffect(()=>{
        const token= cookies.get("token");
        if(token){
         navigate('/chat')
        }
     },[])
    
      const handleChange = (e) => {
       
        const { name, value } = e.target;
        console.log(name,value)

        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        // Do something with formData, like send it to an API or process it further
        const requestOptions = {
            method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        LoginService(requestOptions).then(data => {
            if(data?.token){
              cookies.set('token',data?.token)
              cookies.set('user',data?.user)
              // socket.emit("add-user", data?.user);
              navigate('/chat')
            }
            setLoading(false)
        })
      };
    
      return (
        <div className={styles.loginWrapper}>
            <div className={styles.cont}>
            <Card style={{margin:"2rem",padding:"1rem"}}
             className={styles.formStyles}
            >
            <Form onSubmit={handleSubmit}
            noValidate validated={validated}
            >
         
          <Form.Group controlId="validationCustom01"
           className="mb-2"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
            <Form.Group className="mb-4" 
           controlId="validationCustom02"
            >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
             />
        </Form.Group>   
            <Row>
                <Col>
                <Button variant="secondary" type="submit">
                {loading?
                <><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
        :
        "Login"}
                </Button>
          </Col>  
          <Col>
          
          </Col>  
            </Row>      
        </Form>
        <div className={styles.linkText}>
           <div className={styles.linkPlaintxt}> don't have account </div>
            <div>
                <Nav>
                <Nav.Item>
                    <Nav.Link onClick={()=>navigate("/register")}>Signup??</Nav.Link>
                </Nav.Item>
                </Nav>
            </div>
          </div>
          </Card>
            </div>
        </div>
      );
}

export default Login