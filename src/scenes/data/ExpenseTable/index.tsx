import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { Expense } from '../../../types'; // Import the Expense type from the types file


const ExpenseTable: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
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

        fetch(`http://localhost:8080/expense/getAllExpenses?page=${page}&size=${pageSize}`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                setExpenses(data.content);
                setTotalPages(data.totalPages);
            });
    }, [page, pageSize]);

    const handleAddExpense = () => {
        const newExpense: Expense = {
            id: 0,
            description: "New Expense",
            // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/expense/saveExpense', {
            method: 'POST',
            body: JSON.stringify(newExpense),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setExpenses([...expenses, data]));
    };

    const handleUpdateExpense = (updatedExpense: Expense) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/expense/saveExpense`, {
            method: 'POST',
            body: JSON.stringify(updatedExpense),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedExpenses = expenses.map(expense => expense.id === data.id ? data : expense);
                setExpenses(updatedExpenses);
            });
    };

    const handleDeleteExpense = (expenseId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/expense/deleteExpense`, {
            method: 'POST',
            body: JSON.stringify({ id: expenseId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
                setExpenses(updatedExpenses);
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
                        {expenses.map(expense => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.id}</TableCell>
                                <TableCell>{expense.description}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateExpense(expense)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteExpense(expense.id)}>
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
            <Button variant="contained" color="primary" onClick={handleAddExpense}>
                Add Expense
            </Button>
        </div>
    );
};

export default ExpenseTable;