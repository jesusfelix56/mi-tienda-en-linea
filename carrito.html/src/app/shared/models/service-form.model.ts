export type ServiceType = 'gas' | 'electricity';
export type GasRateType = 'tur' | 'freeMarket';
export type ElectricityRateType = 'fixed' | 'variable';

export interface ServiceFormDraft {
  name?: string;
  email?: string;
  service?: ServiceType;
  rateGas?: GasRateType;
  rateElectricity?: ElectricityRateType;
  consumption?: number;
  power?: number;
}

interface ServiceFormBasePayload {
  name: string;
  email: string;
  service: ServiceType;
}

export interface GasServiceFormPayload extends ServiceFormBasePayload {
  service: 'gas';
  rateGas: GasRateType;
  consumption: number;
}

export interface ElectricityServiceFormPayload extends ServiceFormBasePayload {
  service: 'electricity';
  rateElectricity: ElectricityRateType;
  power: number;
}

export type ServiceFormPayload =
  | GasServiceFormPayload
  | ElectricityServiceFormPayload;
