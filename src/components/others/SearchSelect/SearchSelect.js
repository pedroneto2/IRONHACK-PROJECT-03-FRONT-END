import 'components/others/SearchSelect/SearchSelect.scss';
import { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';

const renderCompaniesNames = (companiesNames, setFieldValue) => {
  if (!companiesNames.length) {
    return <div className="form-company-option"> No company found with this name!</div>;
  }
  return companiesNames.map((company) => (
    <div
      key={company}
      className="form-company-option"
      onClick={() => setFieldValue('company', company, true)}
      aria-hidden="true"
    >
      {company}
    </div>
  ));
};

const SearchSelect = ({
  values,
  touched,
  errors,
  loadingCompanies,
  companiesNames,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const [companyFieldActive, setCompanyFieldActive] = useState(false);
  return (
    <Form.Group className="mb-3" controlId="formBasicCompany">
      <h4 className="text-center">EMPRESA:</h4>
      <Form.Control
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
          renderCompaniesNames(companiesNames, setFieldValue)
        )}
      </div>
      <Form.Control.Feedback>Ok!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default SearchSelect;
