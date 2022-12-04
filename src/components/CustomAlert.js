import { Alert } from 'react-bootstrap';

const CustomAlert = ({ error }) => {
  const { heading, message } = error;
  return (
    <Alert variant='danger' dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};
export default CustomAlert;
