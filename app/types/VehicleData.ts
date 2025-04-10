export interface Vehicle {
    id?: string; // Optional for newly created vehicles
    driverId: string | undefined; // If linked to a driver
    company: string;
    vehicleModel: string;
    year: number;
    status: "active" | "free";
}
  
export interface VehicleState {
    vehicles: Vehicle[];
    isloading: boolean;
    iserror: string | null;
}
  