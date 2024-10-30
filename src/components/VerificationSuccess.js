import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerificationSuccess = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Alert variant="success">
            <Alert.Heading>Email Verified Successfully!</Alert.Heading>
            <p>
              Your email has been verified. You can now log in to your account.
            </p>
          </Alert>
          <Button href="/#/login" variant="success">Go to Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VerificationSuccess;
