"use client";
import { useDispatch } from "react-redux";
import DashboardLayout from "../../DashBoardLayout";
import { AppDispatch } from "@/app/store/store";
import { useSelector } from "react-redux";
import { fetchSettings, selectSettings } from "../../slices/slice/settingSlics";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Settings() {
    const dispatch = useDispatch<AppDispatch>();
    const { settings, isLoading, error } = useSelector(selectSettings);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#F5EF1B]">Settings</h1>
                
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
                        {error}
                    </div>
                )}

                {settings && (
                    <div className="bg-[#F5EF1B] shadow-lg rounded-lg p-6 max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pricing Details</h2>
                        <div className="space-y-3">
                            <p className="text-lg text-gray-600">
                                <span className="font-medium">Base Price:</span> 
                                <span className="ml-2 text-gray-800">${settings.basePrice}</span>
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-medium">Price Per Km:</span> 
                                <span className="ml-2 text-gray-800">${settings.pricePerKm}</span>
                            </p>
                        </div>

                        <Button className="mt-4">Update the Price</Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
