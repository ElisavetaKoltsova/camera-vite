import { createSlice } from '@reduxjs/toolkit';
import { ReviewData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-action';

const initialState: ReviewData = {
  reviews: [],
  isReviewsDataLoading: false
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      });
  }
});
