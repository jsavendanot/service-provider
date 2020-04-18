import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetchStory,
  fetchStrenghts,
  fetchAreas,
  startLoading,
  stopLoading
} from './storySlice';
import { FocusArea, AreaApiType } from 'types/other';
import { Strength, Story } from 'types/story';

//** ASYNC FUNCS */
export const fetchStoryData = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const story = await callMyStoryReadApi();
    dispatch(
      fetchStory({
        story
      })
    );
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchStrenghtsData = (): AppThunk => async dispatch => {
  try {
    const strengths = await callStrengthReadApi();
    dispatch(
      fetchStrenghts({
        strengths
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchAreasData = (): AppThunk => async dispatch => {
  try {
    const focusAreas = await callFocusAreaListApi();
    const myFocusAreas = focusAreas.filter(item => item.isSelected);
    dispatch(
      fetchAreas({
        focusAreas: myFocusAreas
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callMyStoryReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/MyStory/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const story: Story = response.data;
      return story;
    });
};

const callStrengthReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const values: Strength[] = [];
  return axios
    .get(`/Strength/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      response.data['Items'].forEach((item: string, index: string) => {
        values.push({
          id: index,
          name: item
        });
      });
      return values;
    });
};

export const callFocusAreaListApi = () => {
  const info = [
    {
      id: '088433ef-caec-e911-a812-000d3a79722d',
      name: 'Mental health',
      image: 'mental-health.svg',
      color: '#F9FF83'
    },
    {
      id: '12ef08fc-caec-e911-a812-000d3a79722d',
      name: 'Physical health / Self-care',
      image: 'physical-health.svg',
      color: '#B5EAE7'
    },
    {
      id: '157c4d02-cbec-e911-a812-000d3a79722d',
      name: 'Identity/ Self-esteem',
      image: 'self-esteem.svg',
      color: '#FEC6FF'
    },
    {
      id: 'd2588108-cbec-e911-a812-000d3a79722d',
      name: 'Relationships',
      image: 'relationships.svg',
      color: '#FFCCCC'
    },
    {
      id: '03598108-cbec-e911-a812-000d3a79722d',
      name: 'Living skills',
      image: 'living-skills.svg',
      color: '#B3CBFF'
    },
    {
      id: '7226830e-cbec-e911-a812-000d3a79722d',
      name: 'Social networks',
      image: 'social-networks.svg',
      color: '#B5EAE7'
    },
    {
      id: '09b88714-cbec-e911-a812-000d3a79722d',
      name: 'Work / Education',
      image: 'work-education.svg',
      color: '#E0E0E0'
    },
    {
      id: '28b88714-cbec-e911-a812-000d3a79722d',
      name: 'Addictive behaviours',
      image: 'addictive-behaviours.svg',
      color: '#66A7BC'
    },
    {
      id: 'b071951a-cbec-e911-a812-000d3a79722d',
      name: 'Accommodation',
      image: 'accommodation.svg',
      color: '#EAE087'
    },
    {
      id: '1680bf20-cbec-e911-a812-000d3a79722d',
      name: 'Responsibilities',
      image: 'responsibilities.svg',
      color: '#FFEE4D'
    },
    {
      id: '3a80bf20-cbec-e911-a812-000d3a79722d',
      name: 'Hope / Trust',
      image: 'hope-trust.svg',
      color: '#C4C4C4'
    }
  ];

  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/FocusArea/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const focusAreas: FocusArea[] = [];
      response.data.forEach((area: AreaApiType) => {
        const areaObject: FocusArea = {
          id: area.Id,
          name: area.Label,
          color: info.find(item => item.id === area.Id)?.color!,
          image: info.find(item => item.id === area.Id)?.image!,
          description: area.Description,
          isSelected: area.IsSelected
        };
        focusAreas.push(areaObject);
      });

      sessionStorage.setItem('focusAreas', JSON.stringify(focusAreas));
      return focusAreas;
    });
};
