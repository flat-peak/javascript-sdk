import { PostalAddress, Tariff } from "./api";

export interface SaveTariffPayload {
  macAddress: string;
  timezone?: string;
  productId: string;
  customerId: string;
  providerId?: string;
  tariffPlan: Tariff;
  postalAddress?: PostalAddress;
}

export interface SaveTariffResponse {
  productId: string;
  customerId: string;
  providerId: string;
  device_id: string;
}

export interface FailureResponse {
  object: "error";
  message: string;
}

export interface ListResponse<T> {
  object: "list";
  url: "/customers";
  has_more: false;
  data: Array<T>;
}

export type ApiResponse<T> = ListResponse<T> | FailureResponse;
