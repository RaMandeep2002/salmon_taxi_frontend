"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../admin/slices/slice/authSlice";
import adminReducer from "../admin/slices/slice/adminslice";
import adddriverreducer from "../admin/slices/slice/addDriverSlice";
import driverFetcingreducer from "../admin/slices/slice/fetchingDriversSlice";
import detailWithVehicleReducer from "../admin/slices/slice/detailWithVechicle";
import registerVehicleReducer from "../admin/slices/slice/registerVehicleSlice";
import updatedriverReducer from "../admin/slices/slice/updateDriverSlice";
import deleteDriverReducer from "../admin/slices/slice/deleteDriverSlice";
import updateVehicleReducer from "../admin/slices/slice/updateVehicleSlice";
import deleteVehicleReducer from "../admin/slices/slice/deleteVehicleSlice";
import fetchBookingHistoryReducer from "../admin/slices/slice/booingHistorySlice";
import updateSettingReducer from "../admin/slices/slice/UpdateSettingSlice";
import settingsReducer from "../admin/slices/slice/settingSlics"
import BookingReportReducer from "../admin/slices/slice/getReportSlice"
import driverStatusReducer from "../admin/slices/slice/driverStatusSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    addDriver: adddriverreducer,
    driversFetching: driverFetcingreducer,
    detailWithVehicle: detailWithVehicleReducer,
    registerVehicle: registerVehicleReducer,
    fetchBookingHistory:fetchBookingHistoryReducer,
    updateDriverinfo : updatedriverReducer,
    deleteDriver: deleteDriverReducer,
    updateVehcile: updateVehicleReducer,
    deleteVehicle: deleteVehicleReducer,
    updateSetting : updateSettingReducer,
    settings: settingsReducer,
    getBookingReport : BookingReportReducer,
    driverStatus: driverStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
