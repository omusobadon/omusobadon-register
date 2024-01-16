export interface ProductInt {
    id: number;
    category: string;
    name: string;
    value: number;
    num: number;
  }
  export interface stockInt {
    id: number;
    product_id: number;
    start: Date;
    end: Date;
    interval: string;
    num: number;
    state: boolean;
  }
  
  export interface orderInt {}
  
  export interface feeInt {}
  
  export interface paymentInt {}
  
  // TableInterface.ts
  export interface customerInt {
    id: number;
    name: string;
    mail: string;
    phone: string;
    password: string;
  }
  
  
  export interface ApiResponse {
    oders: orderInt[];
    stocks: stockInt[];
    products: ProductInt[];
    fees: feeInt[];
    payments: paymentInt[];
    customer: customerInt[];
  }
  