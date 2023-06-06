import {PostalAddress, Tariff} from "./api";

export interface SaveTariffPayload {
    macAddress: string;
    timezone?: PostalAddress;
    productId: string;
    customerId: string;
    providerId?: string;
    tariffPlan: Tariff;
}

export interface SaveTariffResponse {
    productId: string;
    customerId: string;
    providerId: string;
    device_id: string;
}
