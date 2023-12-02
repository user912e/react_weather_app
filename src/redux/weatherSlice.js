import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: {
    clouds: undefined,
    main: undefined,
    name: undefined,
    sys: undefined,
    weather: undefined,
    wind: undefined,
  },
  isSetWeather: false,
};
const weatherSice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setData: (state, action) => action.payload.weather,
  },
});

export const { setData } = weatherSice.actions;
export default weatherSice.reducer;
