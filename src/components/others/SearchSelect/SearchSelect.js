// import axios from 'axios';
import 'components/others/SearchSelect/SearchSelect.scss';
import { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';

const renderCompaniesNames = (companies, setFieldValue) => {
  if (!companies.length) {
    return <div className="form-company-option"> No company found with this name!</div>;
  }

  return companies.map((company) => (
    <div
      key={company.logo}
      className="form-company-option"
      onClick={() => {
        setFieldValue('company', company.name, true);
        setFieldValue('companyLogo', company.logo, true);
      }}
      aria-hidden="true"
    >
      <div className="d-flex flex-row">
        <Container>
          <img className="img-fluid  img-thumbnail" src={company.logo} alt="logo-company" />
        </Container>
        <Container>
          {company.name}
        </Container>
      </div>
    </div>
  ));
};

const SearchSelect = ({
  values,
  touched,
  errors,
  loadingCompanies,
  companies,
  handleChange,
  handleBlur,
  setFieldValue,
  setValues,
}) => {
  const [companyFieldActive, setCompanyFieldActive] = useState(false);

  return (
    <Form.Group className="mb-3" controlId="formBasicCompany">
      <h4 className="text-center">EMPRESA:</h4>
      <Form.Control
        autocomplete="off"
        type="string"
        name="company"
        placeholder="Procure pelo nome da empresa ou adicione uma nova"
        size="lg"
        value={values.company}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          setTimeout(() => setCompanyFieldActive(false), 100);
        }}
        onFocus={() => setCompanyFieldActive(true)}
        isValid={touched.company && !errors.company}
        isInvalid={touched.company && errors.company}
      />
      <div
        className={`form-companies-options-container ${
          (values.company && companyFieldActive) || 'd-none'
        }`}
      >
        {loadingCompanies ? (
          <Spinner className="mx-auto my-2" animation="border" variant="dark" />
        ) : (
          renderCompaniesNames(companies, setFieldValue, setValues)
        )}
      </div>
      <Form.Control.Feedback>Ok!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default SearchSelect;
