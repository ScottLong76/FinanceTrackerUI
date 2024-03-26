export interface Bank {
    id: number;
    description: string;
    // other properties...
  }
  
  export interface BankTransaction {
    id: number;
    description: string;
    amount: number;
    transactionDate: Date;
    // other properties...
  }

  export interface Expense {
    id: number;
    description: string;
  }

  export interface ExpenseCategory {
    id: number;
    description: string;
  }
  
  export interface Bill {
    id: number;
    fixedPaymentAmount: number;
    fixedPayments: string;
    paymentSchedule: string;
    expense: Expense;
    // other properties...
  }
  
  export interface Deposit {
    id: number;
    description: string;
    // other properties...
  }

  export interface DepositCategory {
    id: number;
    description: string;
  }

  export interface Vendor {
    id: number
    description: string;
    expense: Expense;
  }