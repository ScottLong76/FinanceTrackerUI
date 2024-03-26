import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { Bank } from '../../../types'; // Import the Bank type from the types file


const BankTable: React.FC = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bank/getAllBanks?page=${page}&size=${pageSize}`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                setBanks(data.content);
                setTotalPages(data.totalPages);
            });
    }, [page, pageSize]);

    const handleAddBank = () => {
        const newBank: Bank = {
            id: 0,
            description: "New Bank",
            // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/bank/saveBank', {
            method: 'POST',
            body: JSON.stringify(newBank),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setBanks([...banks, data]));
    };

    const handleUpdateBank = (updatedBank: Bank) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bank/saveBank`, {
            method: 'POST',
            body: JSON.stringify(updatedBank),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedBanks = banks.map(bank => bank.id === data.id ? data : bank);
                setBanks(updatedBanks);
            });
    };

    const handleDeleteBank = (bankId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bank/deleteBank`, {
            method: 'POST',
            body: JSON.stringify({ id: bankId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedBanks = banks.filter(bank => bank.id !== bankId);
                setBanks(updatedBanks);
            });
    };

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        console.log(newPage);
            setPage(newPage);
     };
    
    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPageSize(Number(event.target.value));
            setPage(1);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Description</TableCell>
                            {/* Add more table headers as needed */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banks.map(bank => (
                            <TableRow key={bank.id}>
                                <TableCell>{bank.id}</TableCell>
                                <TableCell>{bank.description}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateBank(bank)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteBank(bank.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={totalPages * pageSize}
					rowsPerPage={pageSize}
					page={page}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handlePageSizeChange}

				/>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleAddBank}>
                Add Bank
            </Button>
        </div>
    );
};

export default BankTable;