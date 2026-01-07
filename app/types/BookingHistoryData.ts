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
    phoneNumber: number;
    pickup: Location;
    dropOff: Location;
    pickuptime: string;
    pickupDate: string;
    pickupTimeFormatted: string;
    dropdownDate: string;
    dropdownTime: string;
    dropoffTimeFormatted?:string;
    arrived: boolean;
    pickupMonth: string;
    pickupWeek: number;
    fareAmount: number;
    distance: number;
    totalFare: number;
    original_Fare_before_round:number;
    discount_price : number;
    after_discount_price: number;
    wating_time : number;
    wating_time_formated: string;
    totalDuration?:string;
    driver: Driver;
    vehAssgnmtDt:string;
    tripDurationMins:number;
    isSvcAnimalYN : boolean;
    paymentStatus: "pending" | "paid";
    paymentMethod: "cash" | "card" | "online";
    status: "pending" | "accepted" | "ongoing" | "completed" | "cancelled";
}

export interface BookingState {
    bookings: BookingHistory[];
    loading: boolean;
    error: string | null;
}
