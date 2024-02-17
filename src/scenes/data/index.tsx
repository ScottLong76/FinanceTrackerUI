
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';

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
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
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
                {/* Bank table content */}


// Add the BankTable component to the TabPanel for Bank table content
<TabPanel value={value} index={0}>
  <BankTable />
</TabPanel>
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
