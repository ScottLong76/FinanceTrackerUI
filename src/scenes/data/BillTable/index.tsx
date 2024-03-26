import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { Bill, Expense } from '../../../types'; // Import the Bill type from the types file


const BillTable: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>([]);
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

        fetch(`http://localhost:8080/bill/getAllBills?page=${page}&size=${pageSize}`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                setBills(data.content)
                setTotalPages(data.totalPages);
            });
    }, [page, pageSize]);

    const handleAddBill = () => {
        const expense: Expense = {
            id: 0,
            description: "New Expense",
        }
        const newBill: Bill = {
            id: 0,
            fixedPaymentAmount: 0,
            fixedPayments: "New Fixed Payments",
            paymentSchedule: "New Payment Schedule",
            expense: expense,
            // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/bill/saveBill', {
            method: 'POST',
            body: JSON.stringify(newBill),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setBills([...bills, data]));
    };

    const handleUpdateBill = (updatedBill: Bill) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bill/saveBill`, {
            method: 'POST',
            body: JSON.stringify(updatedBill),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedBills = bills.map(bill => bill.id === data.id ? data : bill);
                setBills(updatedBills);
            });
    };

    const handleDeleteBill = (billId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bill/deleteBill`, {
            method: 'POST',
            body: JSON.stringify({ id: billId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedBills = bills.filter(bill => bill.id !== billId);
                setBills(updatedBills);
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
                        {bills.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3}>No records found</TableCell>
                        </TableRow>
                    ) : (
                        bills.map(bill => (
                            <TableRow key={bill.id}>
                                <TableCell>{bill.id}</TableCell>
                                <TableCell>{bill.expense.description}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateBill(bill)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteBill(bill.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )))}
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
            <Button variant="contained" color="primary" onClick={handleAddBill}>
                Add Bill
            </Button>
        </div>
    );
};

export default BillTable;