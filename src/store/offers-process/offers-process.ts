import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, cityNames } from '../../const';
import { OffersState } from '../../types/state';
import { fetchOffers} from '../api-actions';
import { City } from '../../types/map';
import { OfferPreview } from '../../types/offer';

const DEFAULT_CITY = cityNames[0];

const initialState: OffersState = {
  cityName: DEFAULT_CITY,
  offers: [],
  activeOffer: null,
  isOffersLoading: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCityName: (state, action: PayloadAction<City['name']>) => {
      state.cityName = action.payload;
      state.activeOffer = null;
    },
    changeActiveOffer: (state, action: PayloadAction<OfferPreview | null>) => {
      state.activeOffer = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
      });
  }
});

export const {changeCityName, changeActiveOffer} = offersProcess.actions;
