import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerificationFailed = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const reason = query.get('reason');

  let message = 'Email verification failed.';
  if (reason === 'already_verified') {
    message = 'Your email is already verified.';
  } else if (reason === 'expired') {
    message = 'The verification link has expired.';
  } else if (reason === 'invalid') {
    message = 'The verification link is invalid.';
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Alert variant="danger">
            <Alert.Heading>Verification Failed</Alert.Heading>
            <p>
              {message}
            </p>
          </Alert>
          <Button href="/#/login" variant="success">Go to Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VerificationFailed;
