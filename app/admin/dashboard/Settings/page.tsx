"use client";
import { useDispatch } from "react-redux";
import DashboardLayout from "../../DashBoardLayout";
import { AppDispatch, RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { fetchSettings, selectSettings } from "../../slices/slice/settingSlics";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdateSettings } from "../../slices/slice/UpdateSettingSlice";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [base_price, setBase_price] = useState<string>("");
  const [km_price, setkm_price] = useState<string>("");
  const [waiting_time_price_per_minutes, setWaiting_time_price_per_minutes] =
    useState<string>("");

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();
  const { settings, isLoading, error } = useSelector(selectSettings);
  const { isUpdating } = useSelector(
    (state: RootState) => state.updateSetting
  );

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("enter");
    e.preventDefault();

    const basePriceNum = parseFloat(base_price);
    const kmPriceNum = parseFloat(km_price);
    const waitingTimeNum = parseFloat(waiting_time_price_per_minutes);

    if (isNaN(basePriceNum) || isNaN(kmPriceNum) || isNaN(waitingTimeNum)) {
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

      if(isUpdating === true){
        toast.toast({
          title:"Successfully update the Prices"
        })
      }
      dispatch(fetchSettings());
    } catch (error) {
      console.error("Failed to update settings:", error);
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
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {settings && (
          <div className="bg-[#F5EF1B] shadow-lg rounded-lg p-6 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pricing Details
            </h2>
            <div className="space-y-3">
              <p className="text-lg text-gray-600">
                <span className="font-medium">Base Price:</span>
                <span className="ml-2 text-gray-800">
                  ${settings.base_price}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium">Distance Price Per KM:</span>
                <span className="ml-2 text-gray-800">${settings.km_price}</span>
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium">Waiting Time Per Minutes:</span>
                <span className="ml-2 text-gray-800">
                  ${Number(settings.waiting_time_price_per_minutes).toFixed(2)}
                </span>
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Update the Price</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] bg-[#F5EF1B] border-none">
                <DialogHeader>
                  <DialogTitle className="text-lg text-zinc-800">
                    Update the Settings
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="base_price"
                        className="text-right text-lg col-span-2 font-medium text-zinc-800"
                      >
                        Base Price:
                      </Label>
                      <Input
                        id="base_price"
                        type="text"
                        value={base_price}
                        onChange={(e) => setBase_price(e.target.value)}
                        className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="km_price"
                        className="text-right text-lg col-span-2 font-medium text-zinc-800"
                      >
                        Distance Price Per KM:
                      </Label>
                      <Input
                        id="km_price"
                        type="text"
                        value={km_price}
                        onChange={(e) => setkm_price(e.target.value)}
                        className="flex h-9 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="waiting_time"
                        className="text-right text-lg col-span-2 font-medium text-zinc-800"
                      >
                        Waiting Time Per Minutes:
                      </Label>
                      <Input
                        id="waiting_time"
                        type="text"
                        value={waiting_time_price_per_minutes}
                        onChange={(e) =>
                          setWaiting_time_price_per_minutes(e.target.value)
                        }
                        className="flex h-9 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
