/* eslint-disable no-unused-vars */
// import axios from 'axios';
import 'components/others/SearchSelect/SearchSelect.scss';
import { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';

const renderCompaniesNames = (companies, setFieldValue, setValidValue) => {
  if (!companies.length) {
    return <div className="form-company-option"> No company found with this name!</div>;
  }

  return companies.map((company) => (
    <div
      key={company.logo}
      className="form-company-option"
      onMouseDown={() => {
        setFieldValue('company', company.name, true);
        setFieldValue('companyLogo', company.logo, true);
        setValidValue(true);
      }}
      aria-hidden="true"
    >
      <div className="search-company-info-container d-flex flex-row align-items-center">
        <div className="image-container">
          <img src={company.logo} alt="company-logo" />
        </div>
        <p>{company.name}</p>
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
  setErrors,
}) => {
  const [companyFieldActive, setCompanyFieldActive] = useState(false);
  const [validValue, setValidValue] = useState(false);

  return (
    <Form.Group className="mb-3" controlId="formBasicCompany">
      <h4 className="text-center">EMPRESA:</h4>
      <Form.Control
        type="string"
        name="company"
        placeholder="Procure pelo site da empresa"
        size="lg"
        value={values.company}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          setCompanyFieldActive(false);
          setValidValue(false);
          if (!validValue) {
            setFieldValue('company', '', true);
            setErrors('Please, select a company from the list');
          }
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
          renderCompaniesNames(companies, setFieldValue, setValidValue)
        )}
      </div>
      <Form.Control.Feedback>Ok!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default SearchSelect;
