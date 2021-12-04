/* eslint-disable no-unused-vars */
import 'components/pages/AssessmentPage/AssessmentPage.scss';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

import { retrieveCompaniesNames, createAssessment } from 'api/api';

import StarRating from 'components/others/StarRating/StarRating';
import FiveStarRate from 'components/others/FiveStarRate/FiveStarRate';
import SearchSelect from 'components/others/SearchSelect/SearchSelect';
import renderAlertMessage from 'components/others/Alert';
import calcRateAverage from 'components/others/calcRateAverage';

import AssessmentsQuestions from 'components/others/AssessmentsQuestions';

const formSchema = yup.object().shape({
  isAnonymous: yup.boolean(),
  grade1: yup.number().required().min(0).max(10),
  grade2: yup.number().required().min(0).max(10),
  grade3: yup.number().required().min(0).max(10),
  grade4: yup.number().required().min(0).max(10),
  grade5: yup.number().required().min(0).max(10),
  grade6: yup.number().required().min(0).max(10),
  grade7: yup.number().required().min(0).max(10),
  comment: yup.string().min(10).max(1000),
  company: yup.string().required().min(3).max(150),
});

const INITIAL_VALUE = {
  isAnonymous: false,
  grade1: 5,
  grade2: 5,
  grade3: 5,
  grade4: 5,
  grade5: 5,
  grade6: 5,
  grade7: 5,
  comment: '',
  company: '',
};

const AssessmentPage = () => {
  const [companiesNames, setCompaniesNames] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '', type: 'danger' });

  const {
    values,
    touched,
    errors,
    status,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    setStatus,
  } = useFormik({
    initialStatus: false,
    initialValues: INITIAL_VALUE,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      try {
        setStatus(true);
        const token = localStorage.getItem('token');
        await createAssessment(formData, token);
        setAlertMessage({
          title: 'Sucesso!',
          description: `A avaliação da empresa "${values.company}" foi criada!`,
          type: 'success',
        });
        window.scrollTo(0, 0);
        setStatus(false);
      } catch (error) {
        setAlertMessage({
          title: 'Erro ao enviar o formulário!',
          description: error.response.data.message,
          type: 'danger',
        });
        window.scrollTo(0, 0);
        setStatus(false);
      }
    },
  });

  useEffect(async () => {
    setLoadingCompanies(true);
    try {
      const response = await retrieveCompaniesNames(values.company);
      const companiesList = response.data.map((companyObject) => companyObject.name);
      setCompaniesNames(companiesList);
      setLoadingCompanies(false);
    } catch (error) {
      setAlertMessage({
        title: 'Erro ao conectar com o servidor!',
        description: error.response.data.message,
        type: 'danger',
      });
      window.scrollTo(0, 0);
      setLoadingCompanies(false);
    }
  }, [values.company]);

  return (
    <div className="assessment-page-container">
      {renderAlertMessage(alertMessage, setAlertMessage)}
      <div className="my-5 d-flex flex-column align-items-center">
        <h2 className="border-3 border-bottom border-dark w-50 text-center">AVALIAR EMPRESAS</h2>
      </div>
      <div className="form-container w-75 mx-auto">
        <Form onSubmit={handleSubmit}>
          <SearchSelect
            values={values}
            touched={touched}
            errors={errors}
            loadingCompanies={loadingCompanies}
            companiesNames={companiesNames}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
          <div className="mt-5 border-2 border-bottom border-dark" />
          {AssessmentsQuestions.map((question, index) => (
            <Form.Group
              key={question.grade}
              className="d-flex flex-column align-items-center text-center"
            >
              {index === 0 || <div className="separator my-5" />}
              <h3 className="mt-5">{question.question}</h3>
              <p>{question.description}</p>
              <StarRating
                name={question.grade}
                values={values}
                setFieldValue={setFieldValue}
                disabled={status}
              />
            </Form.Group>
          ))}

          <div className="mt-5 border-2 border-bottom border-dark" />
          <div className="general-grade-container d-flex flex-column align-items-center">
            <h3 className="mt-5 text-center">NOTA GERAL</h3>
            <FiveStarRate grade={calcRateAverage(values)} />
          </div>
          <Form.Group className="d-flex flex-column align-items-center text-center my-5">
            <Form.Check
              name="isAnonymous"
              label="Avaliação Anônima"
              onChange={handleChange}
              id="anonymous-check"
            />
            <p>*Avaliações anônimas possuem menos peso na média geral.</p>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="comment"
              className="comment-field"
              placeholder="Deixe um comentário sobre sua experiência!"
              style={{ height: '100px' }}
              maxLength={1000}
              value={values.comment}
              onChange={handleChange}
              disabled={status}
              isValid={touched.comment && !errors.comment}
              isInvalid={touched.comment && errors.comment}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
          </Form.Group>
          <Button
            className="form-button border-3 border-dark"
            variant="light"
            type="submit"
            size="lg"
            disabled={status}
          >
            {status ? <Spinner animation="border" variant="dark" /> : 'ENVIAR AVALIAÇÃO'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AssessmentPage;
