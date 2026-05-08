export type Screen = "home" | "result" | "login" | "delivery";

export interface Order {
  invoice: string;
  customer: string;
  address: string;
  status: string;
  image?: string;
}