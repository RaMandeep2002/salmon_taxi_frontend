export interface Vehicle {
  id?: string; // optional for frontend
  registrationNumber?: string; // generated on backend
  company: string;
  vehicleModel: string;
  year: number;
  vehicle_plate_number: string;
  vehRegJur?: string;
  isAssigned?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface VehicleState {
  vehicles: Vehicle[];
  validationErrors: ValidationError[];
  isloading: boolean;
  iserror: string | null;
}

export interface VehicleResponse{
  message: string;
  vehicle: Vehicle[];
}

export interface ApiErrorResponse {
  iserror?: string;
  message?: string;
  errors?: ValidationError[];
  validationErrors?: ValidationError[];
}