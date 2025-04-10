"use client";
import { useDispatch } from "react-redux";
import DashboardLayout from "../../DashBoardLayout";
import { AppDispatch } from "@/app/store/store";
import { useSelector } from "react-redux";
import { fetchSettings, selectSettings } from "../../slices/slice/settingSlics";
import { useEffect } from "react";
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pricing Details
            </h2>
            <div className="space-y-3">
              <p className="text-lg text-gray-600">
                <span className="font-medium">Flag Price:</span>
                <span className="ml-2 text-gray-800">
                  ${settings.flag_price}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium">Distance Price Per Meter:</span>
                <span className="ml-2 text-gray-800">
                  ${settings.distance_price_per_meter}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium">Waiting Time Per Second:</span>
                <span className="ml-2 text-gray-800">
                  ${settings.waiting_time_price_per_seconds}
                </span>
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild className="text-white">
                <Button className="mt-4">Update the Price</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] bg-[#F5EF1B] border-none">
                <DialogHeader>
                  <DialogTitle className="text-lg text-zinc-800">
                    Update the Settings
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="text-right text-lg col-span-2 font-medium text-zinc-800"
                    >
                      Flag Price:
                    </Label>
                    <Input
                      id="name"
                      defaultValue={`$${settings.flag_price}`}
                      className="flex h-9 w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2 border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="text-right text-lg col-span-2 font-medium text-zinc-800"
                    >
                      Distance Price Per Meter:
                    </Label>
                    <Input
                      id="name"
                      defaultValue={`$${settings.distance_price_per_meter}`}
                      className="flex h-9 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2  border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="text-right text-lg col-span-2 font-medium text-zinc-800"
                    >
                      Waiting Time Per Second:
                    </Label>
                    <Input
                      id="name"
                      defaultValue={`$${settings.waiting_time_price_per_seconds}`}
                      className="flex h-9 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2  border border-zinc-800 rounded-lg text-zinc-800 text-lg"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    // onClick={() =>
                    //   handleUpdateDriver(selectedDriver!)
                    // }
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
