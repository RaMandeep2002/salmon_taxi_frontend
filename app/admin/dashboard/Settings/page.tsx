"use client";

import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../DashBoardLayout";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchSettings, selectSettings } from "../../slices/slice/settingSlics";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdateSettings } from "../../slices/slice/UpdateSettingSlice";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const { settings, isLoading, error } = useSelector(selectSettings);
  const { isUpdating } = useSelector((state: RootState) => state.updateSetting);

  const [base_price, setBase_price] = useState<string>("");
  const [km_price, setKm_price] = useState<string>("");
  const [waiting_time_price_per_minutes, setWaitingTime] = useState<string>("");

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setBase_price(settings.base_price.toString());
      setKm_price(settings.km_price.toString());
      setWaitingTime(settings.waiting_time_price_per_minutes.toString());
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const basePriceNum = parseFloat(base_price);
    const kmPriceNum = parseFloat(km_price);
    const waitingTimeNum = parseFloat(waiting_time_price_per_minutes);

    if (isNaN(basePriceNum) || isNaN(kmPriceNum) || isNaN(waitingTimeNum)) {
      toast.toast({ title: "Please enter valid numbers." });
      return;
    }

    try {
      await dispatch(
        UpdateSettings({
          base_price: basePriceNum,
          km_price: kmPriceNum,
          waiting_time_price_per_minutes: waitingTimeNum,
        })
      ).unwrap();

      toast.toast({ title: "Successfully updated the Prices" });
      dispatch(fetchSettings());
    } catch (error) {
      alert(`Failed to update. ${error}`);
    }
  };

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
          <div className="text-white mb-4">
            {error}
          </div>
        )}

        {!isLoading && settings && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#F5EF1B] shadow-lg rounded-lg p-6 max-w-md"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pricing Details
            </h2>

            <div className="space-y-4">
              <div>
                <Label className="block text-zinc-800 font-medium mb-1">
                  Base Price:
                </Label>
                <Input
                  type="text"
                  value={base_price}
                  onChange={(e) => setBase_price(e.target.value)}
                  className="border border-zinc-800 text-zinc-800"
                />
              </div>

              <div>
                <Label className="block text-zinc-800 font-medium mb-1">
                  Distance Price Per KM:
                </Label>
                <Input
                  type="text"
                  value={km_price}
                  onChange={(e) => setKm_price(e.target.value)}
                  className="border border-zinc-800 text-zinc-800"
                />
              </div>

              <div>
                <Label className="block text-zinc-800 font-medium mb-1">
                  Waiting Time Per Minute:
                </Label>
                <Input
                  type="text"
                  value={waiting_time_price_per_minutes}
                  onChange={(e) => setWaitingTime(e.target.value)}
                  className="border border-zinc-800 text-zinc-800"
                />
              </div>

              <Button
                type="submit"
                disabled={isUpdating}
                className="mt-4 bg-black text-white hover:bg-zinc-800"
              >
                {isUpdating ? "Updating..." : "Update Prices"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
  