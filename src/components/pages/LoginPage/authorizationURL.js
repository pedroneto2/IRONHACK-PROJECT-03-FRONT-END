const base_URL = 'https://www.linkedin.com/oauth/v2/authorization?';

const LINKEDIN_AUTHORIZATION_URL = () => {
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('redirect_uri', process.env.REACT_APP_REDIRECT_URL);
  params.append('client_id', process.env.REACT_APP_CLIENT_ID);
  params.append('state', process.env.REACT_APP_STATE);
  params.append('scope', process.env.REACT_APP_SCOPE);
  return base_URL + params;
};

export default LINKEDIN_AUTHORIZATION_URL;
