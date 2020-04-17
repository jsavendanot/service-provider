import uuid from 'uuid/v1';
import mock from 'common/utils/mock';

mock.onGet('/api/goals').reply(200, {
  current: [
    {
      id: uuid(),
      focusArea: 'Relationships',
      goalName: 'Reconnect with my brother',
      status: 'active',
      percent: 60,
      steps: [
        {
          id: 1,
          name: 'Send a birthday card to Tom',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Invite Tom’s family for dinner',
          date: '10 Aug 2019',
          status: ''
        },
        {
          id: 3,
          name: 'Schedule a get-together at least every fortnight',
          status: '48 visits left',
          date: '10 Aug 2019'
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Mental Health',
      goalName: '(Pending) Learn to control my temper',
      status: 'pending',
      percent: 0,
      steps: [
        { id: 1, name: 'Consult Rob', date: '10 Aug 2019', status: '' },
        {
          id: 2,
          name: 'Talk to someone I dislike without starting an argument',
          date: '10 Aug 2019',
          status: ''
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Physical Health',
      goalName: 'Lose 10 kilos',
      status: 'active',
      percent: 60,
      steps: [
        {
          id: 1,
          name: 'Sign up the gym',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Go to yoga class',
          date: '10 Aug 2019',
          status: '12 classes left'
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Work / Education',
      goalName: 'Find a job',
      status: 'declined',
      percent: 0,
      steps: [
        {
          id: 1,
          name: 'Research interested industries',
          date: '10 Aug 2019',
          status: ''
        },
        {
          id: 2,
          name: 'Write a resume',
          date: '10 Aug 2019',
          status: ''
        },
        {
          id: 3,
          name: 'Apply for jobs',
          date: '10 Aug 2019',
          status: ''
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Addictive behaviours',
      goalName: 'Quit drinking',
      status: 'active',
      percent: 60,
      steps: [
        {
          id: 1,
          name: 'Throw all the beers to the bin (recycle the cans)',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Visit Dr Gary',
          date: '10 Aug 2019',
          status: '12 classes left'
        }
      ]
    }
  ],
  completed: [
    {
      id: uuid(),
      focusArea: 'Relationships',
      goalName: 'Reconnect with my brother',
      status: 'active',
      percent: 100,
      steps: [
        {
          id: 1,
          name: 'Send a birthday card to Tom',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Invite Tom’s family for dinner',
          date: '10 Aug 2019',
          status: ''
        },
        {
          id: 3,
          name: 'Schedule a get-together at least every fortnight',
          status: '48 visits left',
          date: '10 Aug 2019'
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Physical Health',
      goalName: 'Lose 10 kilos',
      status: 'active',
      percent: 100,
      steps: [
        {
          id: 1,
          name: 'Sign up the gym',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Go to yoga class',
          date: '10 Aug 2019',
          status: '12 classes left'
        }
      ]
    },
    {
      id: uuid(),
      focusArea: 'Addictive behaviours',
      goalName: 'Quit drinking',
      status: 'active',
      percent: 100,
      steps: [
        {
          id: 1,
          name: 'Throw all the beers to the bin (recycle the cans)',
          date: '10 Aug 2019',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Visit Dr Gary',
          date: '10 Aug 2019',
          status: '12 classes left'
        }
      ]
    }
  ]
});
