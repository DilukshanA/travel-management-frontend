import { VehicleTypes } from "./vehicle";

export type getAllVehiclesRes = {
    message: string;
    vehicles: VehicleTypes[];
}