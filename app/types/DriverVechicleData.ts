export interface Vehicle {
    _id: string;
    registrationNumber: string;
    make: string;
    vehicleModel: string;
    year: number;
    status: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Drivers {
    driverId: string;
    drivername:string;
    vehicle: Vehicle[];
  }
  
  export interface DriversResponse {
    message: string;
    formattedDrivers: Drivers[]; // Add this line to match the API response
  }
  