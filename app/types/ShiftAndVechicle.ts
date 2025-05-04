// types.ts
export interface Driver {
    _id: string;
    driverId: string;
    drivername: string;
    email: string;
    phoneNumber: string;
}

export interface Vehicle {
    _id: string;
    registrationNumber: string;
    vehicleModel: string;
    vehicle_plate_number: string;
    isAssigned: boolean;
}

export interface ShiftWithVehicleHistory {
    _id: string;
    driverId:string;
    startTime: string;
    startDate: string;
    endTime: string;
    endDate: string;
    totalEarnings: number;
    totalTrips: number;
    totalDistance: number;
    totalDuration: string;
    isActive: boolean;
    createdAt: string;
    driver: Driver;
    vehicle: Vehicle;
}

export interface ShiftsState {
    shifts: ShiftWithVehicleHistory[];
    loading: boolean;
    error: string | null;
}
