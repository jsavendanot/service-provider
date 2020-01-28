import mock from 'utils/mock';

mock.onGet('/api/story').reply(200, {
  story: [
    {
      id: 1,
      image: '/images/story/area/physical.svg',
      name: 'Physical health / Self-care',
      background: '#B5EAE7'
    },
    {
      id: 2,
      image: '/images/story/area/relationships.svg',
      name: 'Relationships',
      background: '#FFCCCC'
    },
    {
      id: 3,
      image: '/images/story/area/education.svg',
      name: 'Work / Education',
      background: '#E0E0E0'
    },
    {
      id: 4,
      image: '/images/story/area/responsibility.svg',
      name: 'Responsibility',
      background: '#FFEE4D'
    },
    {
      id: 5,
      image: '/images/story/area/mental_health.svg',
      name: 'Mental health',
      background: '#F9FF83'
    },
    {
      id: 6,
      image: '/images/story/area/living_skills.svg',
      name: 'Living skills',
      background: '#B3CBFF'
    },
    {
      id: 7,
      image: '/images/story/area/accommodation.svg',
      name: 'Accommodation',
      background: '#EAE087'
    },
    {
      id: 8,
      image: '/images/story/area/social_networks.svg',
      name: 'Social networks',
      background: '#B5EAE7'
    },
    {
      id: 9,
      image: '/images/story/area/addictive.svg',
      name: 'Addictive behaviours',
      background: '#66A7BC'
    },
    {
      id: 10,
      image: '/images/story/area/identity.svg',
      name: 'Identity / Self-esteem',
      background: '#FEC6FF'
    },
    {
      id: 11,
      image: '/images/story/area/hope.svg',
      name: 'Hope / Trust',
      background: '#D2F4A5'
    }
  ]
});

mock.onGet('/api/mystory').reply(200, {
  mystory: [
    {
      id: 1,
      image: '/images/story/area/physical.svg',
      name: 'Physical health / Self-care',
      background: '#B5EAE7'
    },
    {
      id: 2,
      image: '/images/story/area/relationships.svg',
      name: 'Relationships',
      background: '#FFCCCC'
    },
    {
      id: 3,
      image: '/images/story/area/education.svg',
      name: 'Work / Education',
      background: '#E0E0E0'
    },
    {
      id: 4,
      image: '/images/story/area/responsibility.svg',
      name: 'Responsibility',
      background: '#FFEE4D'
    }
  ]
});
