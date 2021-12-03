import { Alert } from 'react-bootstrap';

const renderAlertMessage = (alertMessage, setAlertMessage) => {
  if (alertMessage.description) {
    return (
      <Alert
        variant={alertMessage.type}
        onClose={() => setAlertMessage({ ...alertMessage, description: '' })}
        dismissible
      >
        <Alert.Heading>{alertMessage.title}</Alert.Heading>
        <p>{alertMessage.description}</p>
      </Alert>
    );
  }
};

export default renderAlertMessage;
