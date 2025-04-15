// types/DriverVehicleData.ts

export interface Vehicle {
  _id: string;
  registrationNumber: string;
  company: string;
  vehicleModel: string;
  year: number;
  vehicle_plate_number:string;
  status: string;
  isAssigned: boolean;
}

export interface VehicleResponse {
  message: string;
  vehicles: Vehicle[];
}
