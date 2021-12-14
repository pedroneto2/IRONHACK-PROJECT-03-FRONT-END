const mockedAssessments = [
  {
    _id: '1',
    isAnonymous: false,
    grade1: 8,
    grade2: 6,
    grade3: 0,
    grade4: 10,
    grade5: 3,
    grade6: 7,
    grade7: 5,
    comment: 'Comentário teste sobre a EMPRESA TESTE',
    user: {
      firstName: 'user1',
      emailAddress: 'user1@gmail.com',
      profilePicture: 'link1',
    },
    company: {
      name: 'Empresa Teste',
    },
    createdAt: {
      $date: '2021-12-04T19:33:41.626Z',
    },
    updatedAt: {
      $date: '2021-12-04T19:33:41.626Z',
    },
  },
  {
    _id: '2',
    isAnonymous: true,
    grade1: 6,
    grade2: 1,
    grade3: 6,
    grade4: 0,
    grade5: 9,
    grade6: 10,
    grade7: 2,
    comment: 'Comentário teste sobre a EMPRESA TESTE',
    user: {
      firstName: 'user2',
      emailAddress: 'user2@gmail.com',
      profilePicture: 'link2',
    },
    company: {
      name: 'Empresa Teste',
    },
    createdAt: {
      $date: '2021-12-04T29:33:41.626Z',
    },
    updatedAt: {
      $date: '2021-12-03T19:33:41.626Z',
    },
  },
  {
    _id: '3',
    isAnonymous: false,
    grade1: 3,
    grade2: 7,
    grade3: 9,
    grade4: 1,
    grade5: 6,
    grade6: 5,
    grade7: 5,
    user: {
      firstName: 'user3',
      emailAddress: 'user3@gmail.com',
      profilePicture: 'link3',
    },
    company: {
      name: 'Empresa Teste',
    },
    createdAt: {
      $date: '2021-12-09T13:33:41.626Z',
    },
    updatedAt: {
      $date: '2021-12-08T11:33:41.626Z',
    },
  },
];

export default mockedAssessments;
