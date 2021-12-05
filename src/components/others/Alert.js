import { Alert } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

const renderAlertMessage = (alertMessage, setAlertMessage, redirect) => {
  const navigate = useNavigate();
  if (alertMessage.description) {
    return (
      <Alert
        variant={alertMessage.type}
        onClose={() => {
          setAlertMessage({ ...alertMessage, description: '' });
          if (redirect) navigate(redirect, { replace: true });
        }}
        dismissible
      >
        <Alert.Heading>{alertMessage.title}</Alert.Heading>
        <p>{alertMessage.description}</p>
      </Alert>
    );
  }
};

export default renderAlertMessage;
