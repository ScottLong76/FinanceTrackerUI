
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BankTable from './BankTable'; // Import the BankTable component

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
                    <Tab label="Income" />
                    <Tab label="Vendor" />
                    <Tab label="Deposit" />
                    <Tab label="Deposit Category" />
                    
                </Tabs>
            </AppBar>
            

            <TabPanel value={value} index={0}>
                <BankTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* Bank Transaction table content */}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* Bill table content */}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* Expense table content */}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {/* Expense Category table content */}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {/* Income table content */}
            </TabPanel>
            <TabPanel value={value} index={6}>
                {/* Vendor table content */}
            </TabPanel>
            <TabPanel value={value} index={7}>
                {/* Deposit table content */}
            </TabPanel>
            <TabPanel value={value} index={8}>
                {/* Deposit Category table content */}
            </TabPanel>
            {/* Add more TabPanels for other tables */}
        </div>
    );
};

export default Data;
