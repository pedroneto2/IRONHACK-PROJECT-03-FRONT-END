/* eslint-disable no-undef */
import { render, screen, within } from '@testing-library/react';
import DetailPage from 'components/pages/DetailPage/DetailPage';
import { retrieveAssessmentsById } from 'api/api';
import { BrowserRouter } from 'react-router-dom';
import mockedAssessments from 'components/pages/DetailPage/mockedAssessment';

jest.mock('api/api');

describe('Testing DetailPage', () => {
  beforeEach(() => {
    retrieveAssessmentsById.mockResolvedValue({ data: [...mockedAssessments] });
  });
  it('Should display all assessments on screen', async () => {
    render(
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>,
    );
    const assessments = await screen.findAllByTestId('assessment container');
    expect(assessments.length).toBe(mockedAssessments.length);
  });
  it('Should display non-anonymous user data and DO NOT display anonymous user data', async () => {
    render(
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>,
    );
    const assessments = await screen.findAllByTestId('assessment container');
    mockedAssessments.forEach((assessment, index) => {
      const assessmentNode = within(assessments[index]);
      const userName = assessmentNode.queryByRole('heading', { level: 4, name: 'user name' });
      const userEmail = assessmentNode.queryByTestId('user email');
      expect(userName.textContent).toBe(
        `avaliação por: ${assessment.isAnonymous ? 'Anônimo' : assessment.user.firstName}`,
      );
      expect(userEmail.textContent).toBe(
        assessment.isAnonymous ? '' : assessment.user.emailAddress,
      );
    });
  });
  it('Should display the correct company average grade', async () => {
    render(
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>,
    );
    const averageContainers = await screen.findAllByTestId('average container');
    mockedAssessments.forEach((assessment, index) => {
      const assessmentNode = within(averageContainers[index]);
      const assesmentFilledStars = assessmentNode.queryAllByTestId('filled star');
      const assessmentHalfStars = assessmentNode.queryAllByTestId('half-filled star');
      let gradesAmmount = 0;
      const gradesSum = Object.keys(assessment).reduce((sum, key) => {
        if (key.includes('grade')) {
          gradesAmmount += 1;
          return sum + assessment[key];
        }
        return sum;
      }, 0);
      const average = Math.round(gradesSum / gradesAmmount);
      const fullStars = Math.floor(average / 2);
      const halfStars = Math.round(average) - 2 * fullStars;
      expect(assesmentFilledStars.length).toBe(fullStars);
      expect(assessmentHalfStars.length).toBe(halfStars);
    });
  });
  it('Should display the correct company grades on screen', async () => {
    render(
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>,
    );
    const assessments = await screen.findAllByTestId('assessment container');
    assessments.forEach((assessment, index) => {
      const assessmentNode = within(assessment);
      const grades = assessmentNode.queryAllByTestId('grade container');
      grades.forEach((grade, index2) => {
        const gradeNode = within(grade);
        const gradeFilledStars = gradeNode.queryAllByTestId('filled star');
        const gradeHalfStars = gradeNode.queryAllByTestId('half-filled star');
        const currentGrade = mockedAssessments[index][`grade${index2 + 1}`];
        const fullStars = Math.floor(currentGrade / 2);
        const halfStars = Math.round(currentGrade) - 2 * fullStars;
        expect(gradeFilledStars.length).toBe(fullStars);
        expect(gradeHalfStars.length).toBe(halfStars);
      });
    });
  });
});
