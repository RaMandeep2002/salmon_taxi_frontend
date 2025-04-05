"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../admin/slices/slice/authSlice";
import adminReducer from "../admin/slices/slice/adminslice";
import adddriverreducer from "../admin/slices/slice/addDriverSlice";
import driverFetcingreducer from "../admin/slices/slice/fetchingDriversSlice";
import driverDetailWithVehicleReducer from "../admin/slices/slice/driverDetailWithVechicle";
import registerVehicleReducer from "../admin/slices/slice/registerVehicleSlice";
import fetchBookingHistoryReducer from "../admin/slices/slice/booingHistorySlice"
import settingsReducer from "../admin/slices/slice/settingSlics"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    addDriver: adddriverreducer,
    driversFetching: driverFetcingreducer,
    driverDetailWithVehicle: driverDetailWithVehicleReducer,
    registerVehicle: registerVehicleReducer,
    fetchBookingHistory:fetchBookingHistoryReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
