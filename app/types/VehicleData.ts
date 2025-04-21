export interface Vehicle {
    id?: string; // optional for frontend
    registrationNumber?: string; // generated on backend
    company: string;
    vehicleModel: string;
    year: number;
    vehicle_plate_number:string;
    isAssigned?: boolean;
  }
  
  export interface VehicleState {
    vehicles: Vehicle[];
    isloading: boolean;
    iserror: string | null;
  }
  