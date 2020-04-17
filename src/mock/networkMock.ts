import uuid from 'uuid/v1';
import mock from 'common/utils/mock';

mock.onGet('/api/networks').reply(200, {
  people: [
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_1.svg',
      name: 'Mum',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: 'Mother',
      practice: '',
      organisation: '',
      access: 'All information',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_3.svg',
      name: 'Rudy',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: 'Friend',
      practice: '',
      organisation: '',
      access: 'Goals, journals, safety plan',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_4.svg',
      name: 'Lucy Black',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: 'Mother',
      practice: '',
      organisation: '',
      access: 'Goals, journals, safety plan',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_5.svg',
      name: 'Mickey Black',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: 'Friend',
      practice: '',
      organisation: '',
      access: 'Goals',
      share: 'Shared care planning'
    }
  ],
  services: [
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_1.svg',
      name: 'Dr Kris',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: '',
      practice: 'Psychiatrist',
      organisation: 'Murrumbidgee Local Health District',
      access: 'All information',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_6.svg',
      name: 'Dr Gary',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: '',
      practice: 'Psychiatrist',
      organisation: 'Murrumbidgee Local Health District',
      access: 'All information',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_3.svg',
      name: 'Bob Manson',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: '',
      practice: 'Social worker',
      organisation: 'One Door Mental Health',
      access: 'All information',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_7.svg',
      name: 'Marlie Grape',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: '',
      practice: 'Social worker',
      organisation: 'Murrumbidgee Local Health District',
      access: 'Goals, Story',
      share: 'Shared care planning'
    },
    {
      id: uuid(),
      avatar: '/images/avatar/avatar_9.svg',
      name: 'Dr Charlie Brown',
      phone: '0412345678',
      email: 'example@gmail.com',
      relationship: '',
      practice: 'GP',
      organisation: 'Wagga Wagga Medical Centre',
      access: 'Safety Plan',
      share: 'Shared care planning'
    }
  ]
});
