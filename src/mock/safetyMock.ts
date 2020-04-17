import mock from 'common/utils/mock';

mock.onGet('/api/staywell').reply(200, {
  staywell: [
    {
      id: 1,
      title: 'Things I do to stay well',
      description: 'These are things that I can do to be and stay well.',
      values: [
        {
          id: 1,
          value: 'Get enough sleep'
        },
        {
          id: 2,
          value: 'Have some me time during the day'
        },
        {
          id: 3,
          value: 'Talk with my close friends'
        }
      ]
    }
  ]
});

mock.onGet('/api/stress').reply(200, {
  stress: [
    {
      id: 2,
      title: 'Things that stress me',
      description:
        'Things that may stress me or cause me to have difficulties managing my issues.',
      values: [
        {
          id: 1,
          value: 'Not feeling safe'
        },
        {
          id: 2,
          value: 'Not being listened to'
        },
        {
          id: 3,
          value: 'Missing my grandpa'
        }
      ]
    }
  ]
});

mock.onGet('/api/warning').reply(200, {
  warning: [
    {
      id: 3,
      difficulty: {
        title: 'Warning signs I may be having difficulty',
        description: 'Things I or others may notice when I am unwell.',
        values: [
          {
            id: 1,
            value: 'Call in sick to work a lot'
          },
          {
            id: 2,
            value: 'Having trouble sleeping or sleeping or sleeping too much'
          },
          {
            id: 3,
            value: 'Struggling to keep up with my usual routine'
          }
        ]
      },
      plan: {
        title: 'Warning signs I may be having difficulty',
        description: 'Things I or others may notice when I am unwell.',
        values: [
          {
            id: 1,
            value: 'Call in sick to work a lot'
          },
          {
            id: 2,
            value: 'Having trouble sleeping or sleeping or sleeping too much'
          },
          {
            id: 3,
            value: 'Struggling to keep up with my usual routine'
          }
        ]
      }
    }
  ]
});

mock.onGet('/api/unwell').reply(200, {
  unwell: [
    {
      id: 4,
      title: 'If I become unwell, I would like others to...',
      description:
        'If I become unwell I would like these to happen or not happen.',
      pleaseDo: [
        {
          id: 1,
          values: [
            {
              id: 1,
              value:
                'Remove or lock up items that could be used to harm myself or others'
            }
          ]
        },
        {
          id: 2,
          values: [
            {
              id: 1,
              value: 'My rent be paid'
            }
          ],
          supports: [
            {
              id: 1,
              value: 'Rudy'
            },
            {
              id: 2,
              value: 'Mum'
            }
          ]
        }
      ],
      dontDo: [
        {
          id: 1,
          values: [
            {
              id: 1,
              value: 'Work to be contacted'
            }
          ],
          supports: [
            {
              id: 1,
              value: 'Mum'
            }
          ]
        },
        {
          id: 2,
          values: [
            {
              id: 1,
              value: 'To be cared by a male worker'
            }
          ]
        }
      ]
    }
  ]
});

mock.onGet('/api/contact').reply(200, {
  contact: [
    {
      id: 5,
      title: 'People or services who I can contact',
      description:
        'People or services who I can contact for support if I need immediate help.',
      people: [
        {
          id: 1,
          values: [
            {
              id: 1,
              value: 'Mum'
            }
          ],
          phones: [
            {
              id: 1,
              value: '0456 679 862'
            }
          ]
        },
        {
          id: 2,
          values: [
            {
              id: 1,
              value: 'Rudy'
            }
          ],
          phones: [
            {
              id: 1,
              value: '0456 679 862'
            }
          ]
        }
      ],
      services: [
        {
          id: 1,
          values: [
            {
              id: 1,
              value: 'Emergency services'
            }
          ],
          phones: [
            {
              id: 1,
              value: '0456 679 862'
            }
          ]
        },
        {
          id: 2,
          values: [
            {
              id: 1,
              value: 'AccessLine'
            }
          ],
          phones: [
            {
              id: 1,
              value: '0456 679 862'
            }
          ]
        }
      ]
    }
  ]
});
