import mock from 'common/utils/mock';

mock.onGet('/api/journals').reply(200, {
  journals: [
    {
      id: 1,
      title: 'Journal Title',
      date: 'Yesterday',
      time: '3:40 pm',
      journalText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ornare vulputate sagittis posuere. Cursus sit tempor...',
      feeling: '1',
      symptoms: {
        work: false,
        sleep: true,
        routine: true
      },
      image: '',
      share: {
        whoCanSee: 'me',
        network: []
      }
    },
    {
      id: 2,
      title: 'Journal Title',
      date: '13 July 2019',
      time: '3:40 pm',
      journalText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ornare vulputate sagittis posuere. Cursus sit tempor...',
      feeling: '1',
      symptoms: {
        work: false,
        sleep: true,
        routine: true
      },
      image: '',
      share: {
        whoCanSee: 'me',
        network: []
      }
    }
  ]
});
