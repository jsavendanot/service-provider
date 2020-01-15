import uuid from 'uuid/v1';
import mock from 'utils/mock';

mock.onGet('/api/consumers').reply(200, {
  consumers: [
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_1.svg',
      name: 'Bessie Richard',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_2.svg',
      name: 'Lily Henry',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'orange'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_3.svg',
      name: 'Debra Mckinney',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'red'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_4.svg',
      name: 'Dianne Jones',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_5.svg',
      name: 'Marvin Fisher',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'green'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_6.svg',
      name: 'Soham Simmmons',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_7.svg',
      name: 'Johnny Miles',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_8.svg',
      name: 'Jennie Pena',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_9.svg',
      name: 'Serenity Hawkins',
      dob: '11/09/1990',
      lastActive: 'Thu, 24 November 2019 ',
      lastMood: 'yellow'
    }
  ]
});
