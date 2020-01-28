import mock from 'utils/mock';

mock.onGet('/api/areas').reply(200, {
  areas: [
    {
      id: 1,
      image: '/images/story/area/physical.svg',
      name: 'Physical health / Self-care',
      background: '#B5EAE7',
      description:
        'Things to consider here include how you can take care of your physical health, keeping clean, how you present yourself, being able to deal with stress and knowing how to keep yourself feeling well.'
    },
    {
      id: 2,
      image: '/images/story/area/relationships.svg',
      name: 'Relationships',
      background: '#FFCCCC',
      description:
        'Things to consider here include how you can take care of your physical health, keeping clean, how you present yourself, being able to deal with stress and knowing how to keep yourself feeling well.'
    },
    {
      id: 3,
      image: '/images/story/area/education.svg',
      name: 'Work / Education',
      background: '#E0E0E0',
      description:
        'Things to consider here include how you can take care of your physical health, keeping clean, how you present yourself, being able to deal with stress and knowing how to keep yourself feeling well.'
    },
    {
      id: 4,
      image: '/images/story/area/responsibility.svg',
      name: 'Responsibility',
      background: '#FFEE4D',
      description:
        'Things to consider here include how you can take care of your physical health, keeping clean, how you present yourself, being able to deal with stress and knowing how to keep yourself feeling well.'
    },
    {
      id: 5,
      image: '/images/story/area/mental_health.svg',
      name: 'Mental health',
      background: '#F9FF83',
      description:
        'This is about how you manage your mental health including yourself and your symptoms. It is about what you can do to build a satisfying and meaningful life, which is not defined by or limited by your mental illness.'
    },
    {
      id: 6,
      image: '/images/story/area/living_skills.svg',
      name: 'Living skills',
      background: '#B3CBFF',
      description:
        'This is about the practical side of being able to live independently –shop and cook for yourself, deal with people who visit, keep your place tidy and look after your money and finances.'
    },
    {
      id: 7,
      image: '/images/story/area/accommodation.svg',
      name: 'Accommodation',
      background: '#EAE087',
      description:
        'This is about the place you live at the moment, whether it’s a hospital, supported accommodation or your own place. It could relate to paying the rent, getting on with neighbours etc.'
    },
    {
      id: 8,
      image: '/images/story/area/social_networks.svg',
      name: 'Social networks',
      background: '#B5EAE7',
      description:
        'This is about your social networks and being part of your community. This can include volunteering, being part of your neighbourhood, a club or society, school or faith organisation or groups of friends.'
    },
    {
      id: 9,
      image: '/images/story/area/addictive.svg',
      name: 'Addictive behaviours',
      background: '#66A7BC',
      description:
        'This is about any possible addictive behaviour you may have, such as drug or alcohol use or other addictions, like gambling, food or shopping. It is about how you can work to reduce the harm to you and others caused by these behaviours.'
    },
    {
      id: 10,
      image: '/images/story/area/identity.svg',
      name: 'Identity / Self-esteem',
      background: '#FEC6FF',
      description:
        'This is about how you feel about yourself and how you define who you are. It is about having a sense of your own identity – your likes and dislikes, what you value in yourself, how you would introduce yourself to someone new.'
    },
    {
      id: 11,
      image: '/images/story/area/hope.svg',
      name: 'Hope / Trust',
      background: '#D2F4A5',
      description:
        'This is about your sense that there are people you can trust and there is hope for your future. It is about trusting in others, trusting in yourself and ultimately having faith in life and trusting that things will work out.'
    }
  ]
});

mock.onGet('/api/myareas').reply(200, {
  myareas: [
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
