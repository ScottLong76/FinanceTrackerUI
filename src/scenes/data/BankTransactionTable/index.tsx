import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';

interface BankTransaction {
  id: number;
  amount: number;
  description: string;
  transactionDate: Date;
  // Add more properties as needed
}

const BankTransactionTable: React.FC = () => {
  const [bankTransactions, setBankTransactions] = useState<BankTransaction[]>([]);
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

        fetch(`http://localhost:8080/bankTransaction/getBankTransactions?page=${page}&size=${pageSize}`, {
          credentials: 'include', // Include credentials in the request
          headers: requestHeaders,
        })
          .then(response => response.json())
          .then(data => {
            console.log(data); // Log the response data to the console
            setBankTransactions(data.content);
            setTotalPages(data.totalPages);
          });
    }, [page, pageSize]);

    const handleAddBankTransaction = () => {
        const newBankTransaction: BankTransaction = {
          id: 0,
          amount: 0,
          description: "New Bank Transaction",
          transactionDate: new Date(), // Add the transactionDate property
          // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/bankTransaction/saveBankTransaction', {
            method: 'POST',
            body: JSON.stringify(newBankTransaction),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setBankTransactions([...bankTransactions, data]));
    };

    const handleUpdateBankTransaction = (updatedBankTransaction: BankTransaction) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bankTransaction/saveBankTransaction`, {
            method: 'POST',
            body: JSON.stringify(updatedBankTransaction),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedBankTransactions = bankTransactions.map(bankTransaction => bankTransaction.id === data.id ? data : bankTransaction);
                setBankTransactions(updatedBankTransactions);
            });
    };

    const handleDeleteBankTransaction = (bankTransactionId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/bankTransaction/deleteBankTransaction`, {
            method: 'POST',
            body: JSON.stringify({ id: bankTransactionId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedBankTransactions = bankTransactions.filter(bankTransaction => bankTransaction.id !== bankTransactionId);
                setBankTransactions(updatedBankTransactions);
            });
    };
	
	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            {/* Add more table headers as needed */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bankTransactions.map(bankTransaction => (
                            <TableRow key={bankTransaction.id}>
                                <TableCell>{bankTransaction.id}</TableCell>
                                <TableCell>{bankTransaction.description}</TableCell>
                                <TableCell>${bankTransaction.amount}</TableCell>
                                <TableCell>{bankTransaction.transactionDate}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateBankTransaction(bankTransaction)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteBankTransaction(bankTransaction.id)}>
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
            <Button variant="contained" color="primary" onClick={handleAddBankTransaction}>
                Add Bank Transaction
            </Button>
        </div>
    );
};

export default BankTransactionTable;