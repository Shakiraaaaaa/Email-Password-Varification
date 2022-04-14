import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';




import './App.css';
import app from "./firebase.init";
import { useState } from "react";

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth(app);

  const handleRegistered = event => {
    setRegistered(event.target.checked);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email varification sent');
      })
  }

  const handleFormSubmit = event => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Please enter a valid password');
      return;
    }

    setValidated(true);
    setEmail('');
    if (registered) {
      console.log(email, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
      console.log('submit', email, password);
    }

    event.preventDefault();
  }

  return (
    <div >
      <h1 className="text-info ms-5 ">Please {registered ? 'Log in' : 'Register'}</h1>
      <div className="registration w-50 mx-auto">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onBlur={handleEmailChange} required placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onBlur={handlePasswordChange} required placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>


          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onChange={handleRegistered} label="Already registered" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {registered ? 'Log in' : 'Register'}
          </Button> <br />
          <Button variant="link" type="submit">
            Forget password
          </Button>
          <p className="text-danger">{error}</p>
        </Form>
      </div>
    </div>
  );
}

export default App;
