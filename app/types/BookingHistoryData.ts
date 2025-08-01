export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

export interface Driver {
    drivername: string;
    email: string;
}

export interface BookingHistory {
    bookingId: string;
    customerName: string;
    pickupDate: string;
    pickuptime: string;
    dropdownTime: string;
    totalFare: number;
    distance:number;
    wating_time:number;
    wating_time_formated:string;
    paymentStatus: string;
    status: string;
    pickup: Location;
    dropOff: Location;
    driver?: Driver;
}

export interface BookingState {
    bookings: BookingHistory[];
    loading: boolean;
    error: string | null;
}
