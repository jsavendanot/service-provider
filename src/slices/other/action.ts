import { AppThunk } from 'store';
import axios from 'utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchAllAreas } from './otherSlice';
import { FocusArea, AreaApiType, FocusAreaClass } from 'types/other';

export const fetchAllFocusAreas = (): AppThunk => async dispatch => {
  try {
    const areas = await getAllFocusAreas();
    dispatch(
      fetchAllAreas({
        areas
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const getAllFocusAreas = () => {
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
    .get(`/FocusArea/List/${sessionStorage.getItem('Carer_UserId')}`)
    .then(response => {
      const focusAreas: FocusArea[] = [];
      response.data.forEach((area: AreaApiType) => {
        const areaInstance = new FocusAreaClass(
          area.Id,
          area.Label,
          info.find(item => item.id === area.Id)?.color!,
          info.find(item => item.id === area.Id)?.image!,
          area.Description,
          area.IsSelected
        );
        const deSerializedArea: FocusArea = JSON.parse(
          JSON.stringify(areaInstance)
        );

        focusAreas.push(deSerializedArea);
      });

      return focusAreas;
    });
};
