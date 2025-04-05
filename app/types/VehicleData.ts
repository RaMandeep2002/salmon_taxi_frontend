export interface Vehicle {
    id?: string; // Optional for newly created vehicles
    driverId?: string; // If linked to a driver
    make: string;
    vehicleModel: string;
    year: number;
    status: "active" | "free";
}
  
export interface VehicleState {
    vehicles: Vehicle[];
    isloading: boolean;
    iserror: string | null;
}
  