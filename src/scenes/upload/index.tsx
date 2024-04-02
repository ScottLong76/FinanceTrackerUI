import { AppBar, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { Bank } from '../../types';

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

interface UploadFormProps {
    banks: string[];
    onUploadSpreadsheet: (file: File) => void;
    onUploadOFX: (file: File, bank: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState(banks.length > 0 ? banks[0].description : '');

    const username = 'myuser';
    const password = 'mypassword';

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    

    useEffect(() => {


        fetch(`http://localhost:8080/bank/getAllBanks`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the response data to the console
                setBanks(data.content);
            });
    }, []);    

    const onUploadSpreadsheet = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/bankTransaction/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
        .then(response => {
            if (response.ok) {
                // Handle successful upload
            } else {
                // Handle upload error
            }
        })
        .catch(error => {
           console.error(error);
        });
    };

    const onUploadOFX = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const bankData = {
            description: selectedBank
        };

        formData.append('bank', JSON.stringify(bankData));

        fetch(`http://localhost:8080/bankTransaction/uploadOfx`, {
            method: 'POST',
            body: formData,
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
        .then(response => {
            if (response.ok) {
                // Handle successful upload
            } else {
                // Handle upload error
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (selectedTab === 0) {
                onUploadSpreadsheet(file);
            } else {
                onUploadOFX(file);
            }
        }
    };

    const handleBankChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedBank(event.target.value as string);
    };

    const isUploadDisabled = selectedBank === '';

    return (
        <div>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Upload Spreadsheet" />
                    <Tab label="Upload OFX" />
                </Tabs>
            </AppBar>
            

            <TabPanel value={selectedTab} index={0}>
                <div>
                    <Typography variant="subtitle1">Valid column headers:</Typography>
                    <Typography variant="body2">
                        DATE, DESCRIPTION, BANK, AMOUNT, EXPENSE, DEPOSIT, VENDOR, DEPOSIT CATEGORY, EXPENSE CATEGORY
                    </Typography>
                    <Typography variant="subtitle1">Required column headers:</Typography>
                    <Typography variant="body2">
                        DATE, DESCRIPTION, BANK, AMOUNT
                    </Typography>
                    <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                </div>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <InputLabel id="bank-select-label" style={{ marginRight: '8px' }}>Bank</InputLabel>
                    <Select
                        labelId="bank-select-label"
                        value={selectedBank}
                        onChange={handleBankChange}
                    >
                        {banks.map((bank) => (
                            <MenuItem key={bank.id} value={bank.description}>
                                {bank.description}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <input type="file" accept=".ofx" onChange={handleFileChange} disabled={isUploadDisabled}/>
                </div>
            </TabPanel>
            {/* Add more TabPanels for other tables */}
        </div>
    );
};

export default UploadForm;