import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchImages, startLoading, stopLoading } from './gallerySlice';
import { Image } from 'types/gallery';

//** ASYNC FUNCS */
export const fetchGalleryImages = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const coverOfMyStoryImageId = getState().story.story.WhereAreYouFrom;
    const images = await callMyStoryPhotoListApi();

    const coverImage = images.find(item => item.Id === coverOfMyStoryImageId);
    const updatedImages = images.filter(
      item => item.Id !== coverOfMyStoryImageId
    );

    coverImage && updatedImages.unshift(coverImage);

    dispatch(
      fetchImages({
        images: updatedImages
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callMyStoryPhotoListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/MyStoryPhoto/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const images: Image[] = JSON.parse(JSON.stringify(response.data));
      return images;
    });
};
