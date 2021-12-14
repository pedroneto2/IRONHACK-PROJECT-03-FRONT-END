/* eslint-disable no-undef */
import { render, screen, within, waitFor } from '@testing-library/react';
import RankingPage from 'components/pages/RankingPage/RankingPage';
import { retriveCompanies } from 'api/api';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('api/api');

const mockedCompanies = [
  { _id: '1', name: 'Empresa 1', average: 4.5 },
  { _id: '2', name: 'Empresa 2', average: 7.4 },
  { _id: '3', name: 'Banco do Brasil', average: 1.4 },
];

describe('Testing RankingPage', () => {
  beforeEach(() => {
    // MOCKING THE API 'retrieveComanies'
    retriveCompanies.mockImplementation((searchName = '') => {
      const filteredCompanies = mockedCompanies.filter((company) => {
        const regex = new RegExp(searchName, 'i');
        return searchName === '' || regex.test(company.name);
      });

      return {
        data: [...filteredCompanies],
      };
    });
  });

  it('Should display companies list on screen', async () => {
    render(
      <BrowserRouter>
        <RankingPage />
      </BrowserRouter>,
    );
    const companies = await screen.findAllByRole('heading', { level: 4, name: 'company name' });
    expect(companies.length).toBe(mockedCompanies.length);
  });
  it('Should display companies "Empresa 1" and "Empresa 2" when searched for "empresa"', async () => {
    render(
      <BrowserRouter>
        <RankingPage />
      </BrowserRouter>,
    );
    const searchInput = await screen.findByRole('textbox');
    userEvent.type(searchInput, 'empresa');

    await waitFor(() => {
      const empresa1 = screen.queryByText('Empresa 1');
      const empresa2 = screen.queryByText('Empresa 2');
      const empresa3 = screen.queryByText('Banco do Brasil');
      expect(empresa1).toBeInTheDocument();
      expect(empresa2).toBeInTheDocument();
      expect(empresa3).not.toBeInTheDocument();
    });
  });
  it('Should display the only "Banco do Brasil" company when searched for "brasil"', async () => {
    render(
      <BrowserRouter>
        <RankingPage />
      </BrowserRouter>,
    );
    const searchInput = await screen.findByRole('textbox');
    userEvent.type(searchInput, 'brasil');

    await waitFor(() => {
      const empresa1 = screen.queryByText('Empresa 1');
      const empresa2 = screen.queryByText('Empresa 2');
      const empresa3 = screen.queryByText('Banco do Brasil');
      expect(empresa1).not.toBeInTheDocument();
      expect(empresa2).not.toBeInTheDocument();
      expect(empresa3).toBeInTheDocument();
    });
  });
  it('Should display correct star configuration according average grade', async () => {
    render(
      <BrowserRouter>
        <RankingPage />
      </BrowserRouter>,
    );

    const companiesContainer = await screen.findAllByTestId('company view');

    mockedCompanies.forEach((company, index) => {
      const companyNode = within(companiesContainer[index]);
      const companyFilledStars = companyNode.queryAllByTestId('filled star');
      const companyHalfStars = companyNode.queryAllByTestId('half-filled star');
      const fullStars = Math.floor(company.average / 2);
      const halfStars = Math.round(company.average) - 2 * fullStars;
      expect(companyFilledStars.length).toBe(fullStars);
      expect(companyHalfStars.length).toBe(halfStars);
    });
  });
});
