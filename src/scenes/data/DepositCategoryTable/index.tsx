import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import base64 from 'base-64';
import React, { useEffect, useState } from 'react';
import { DepositCategory } from '../../../types'; // Import the DepositCategory type from the types file


const DepositCategoryTable: React.FC = () => {
    const [depositCategorys, setDepositCategorys] = useState<DepositCategory[]>([]);
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

        fetch(`http://localhost:8080/depositCategory/getAllDepositCategories?page=${page}&size=${pageSize}`, {
            credentials: 'include', // Include credentials in the request
            headers: requestHeaders,
        })
            .then(response => response.json())
            .then(data => {
                setDepositCategorys(data.content);
                setTotalPages(data.totalPages);
            });
    }, [page, pageSize]);

    const handleAddDepositCategory = () => {
        const newDepositCategory: DepositCategory = {
            id: 0,
            description: "New DepositCategory",
            // Add more properties as needed
        };

        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch('http://localhost:8080/depositCategory/saveDepositCategory', {
            method: 'POST',
            body: JSON.stringify(newDepositCategory),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => setDepositCategorys([...depositCategorys, data]));
    };

    const handleUpdateDepositCategory = (updatedDepositCategory: DepositCategory) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/depositCategory/saveDepositCategory`, {
            method: 'POST',
            body: JSON.stringify(updatedDepositCategory),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                const updatedDepositCategorys = depositCategorys.map(depositCategory => depositCategory.id === data.id ? data : depositCategory);
                setDepositCategorys(updatedDepositCategorys);
            });
    };

    const handleDeleteDepositCategory = (depositCategoryId: number) => {
        const username = 'myuser';
        const password = 'mypassword';

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        requestHeaders.set('Access-Control-Allow-Origin', '*');
        requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        fetch(`http://localhost:8080/depositCategory/deleteDepositCategory`, {
            method: 'POST',
            body: JSON.stringify({ id: depositCategoryId }),
            headers: requestHeaders,
            mode: 'no-cors' // Set request mode to "no-cors"
        })
            .then(() => {
                const updatedDepositCategorys = depositCategorys.filter(depositCategory => depositCategory.id !== depositCategoryId);
                setDepositCategorys(updatedDepositCategorys);
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
                        {depositCategorys.map(depositCategory => (
                            <TableRow key={depositCategory.id}>
                                <TableCell>{depositCategory.id}</TableCell>
                                <TableCell>{depositCategory.description}</TableCell>
                                {/* Add more table cells for other properties */}
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateDepositCategory(depositCategory)}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteDepositCategory(depositCategory.id)}>
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
            <Button variant="contained" color="primary" onClick={handleAddDepositCategory}>
                Add DepositCategory
            </Button>
        </div>
    );
};

export default DepositCategoryTable;