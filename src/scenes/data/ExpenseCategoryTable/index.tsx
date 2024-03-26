import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { ExpenseCategory } from '../../../types'; // Import the ExpenseCategory type from the types file


const ExpenseCategoryTable: React.FC = () => {
    const [expenseCategorys, setExpenseCategorys] = useState<ExpenseCategory[]>([]);
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

        fetch(`http://localhost:8080/expenseCategory/getAllExpenseCategories?page=${page}&size=${pageSize}`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                setExpenseCategorys(data.content);
                setTotalPages(data.totalPages);
            });
    }, [page, pageSize]);

    const handleAddExpenseCategory = () => {
        const newExpenseCategory: ExpenseCategory = {
            id: 0,
            description: "New ExpenseCategory",
            // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/expenseCategory/saveExpenseCategory', {
            method: 'POST',
            body: JSON.stringify(newExpenseCategory),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setExpenseCategorys([...expenseCategorys, data]));
    };

    const handleUpdateExpenseCategory = (updatedExpenseCategory: ExpenseCategory) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/expenseCategory/saveExpenseCategory`, {
            method: 'POST',
            body: JSON.stringify(updatedExpenseCategory),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedExpenseCategorys = expenseCategorys.map(expenseCategory => expenseCategory.id === data.id ? data : expenseCategory);
                setExpenseCategorys(updatedExpenseCategorys);
            });
    };

    const handleDeleteExpenseCategory = (expenseCategoryId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/expenseCategory/deleteExpenseCategory`, {
            method: 'POST',
            body: JSON.stringify({ id: expenseCategoryId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedExpenseCategorys = expenseCategorys.filter(expenseCategory => expenseCategory.id !== expenseCategoryId);
                setExpenseCategorys(updatedExpenseCategorys);
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
                        {expenseCategorys.map(expenseCategory => (
                            <TableRow key={expenseCategory.id}>
                                <TableCell>{expenseCategory.id}</TableCell>
                                <TableCell>{expenseCategory.description}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateExpenseCategory(expenseCategory)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteExpenseCategory(expenseCategory.id)}>
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
            <Button variant="contained" color="primary" onClick={handleAddExpenseCategory}>
                Add ExpenseCategory
            </Button>
        </div>
    );
};

export default ExpenseCategoryTable;