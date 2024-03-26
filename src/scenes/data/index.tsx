
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BankTable from './BankTable'; // Import the BankTable component
import BankTransactionTable from './BankTransactionTable'; // Import the BankTransactionTable component
import BillTable from './BillTable';
import DepositCategoryTable from './DepositCategoryTable';
import DepositTable from './DepositTable';
import ExpenseCategoryTable from './ExpenseCategoryTable';
import ExpenseTable from './ExpenseTable';
import VendorTable from './VendorTable';

const TabPanel: React.FC<{ value: number, index: number }> = ({ value, index, children }) => {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Typography component="div">
                    {children}
                </Typography>
            )}
        </div>
    );
};

const Data: React.FC = () => {
    const [value, setValue] = useState(0); // Declare and initialize the 'value' state variable

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => { // Specify the correct type for the '_event' parameter
        setValue(newValue); // Define the 'setValue' function to update the 'value' state variable
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Bank" />
                    <Tab label="Bank Transaction" />
                    <Tab label="Bill" />
                    <Tab label="Expense" />
                    <Tab label="Expense Category" />
                    <Tab label="Vendor" />
                    <Tab label="Deposit" />
                    <Tab label="Deposit Category" />
                    
                </Tabs>
            </AppBar>
            

            <TabPanel value={value} index={0}>
                <BankTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BankTransactionTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BillTable/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ExpenseTable />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ExpenseCategoryTable />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <VendorTable />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <DepositTable />
            </TabPanel>
            <TabPanel value={value} index={7}>
                <DepositCategoryTable />
            </TabPanel>
            {/* Add more TabPanels for other tables */}
        </div>
    );
};

export default Data;
