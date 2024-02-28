'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Table, Button, ButtonGroup } from "react-bootstrap"
import moment from "moment"
import Pagination from "../Components/pagination/Pagination";
import {paginate} from '../utils/paginate';

export default function myrequests() {
    const [userId, setUserId] = useState<string | null>('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        console.log(userId);
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const getTableData = async() => {
                await axios.request({
                    method: 'GET',
                    url: 'http://localhost:8080/api/user/myrequests', 
                    responseType: 'json',
                    params: {
                        id: userId
                    }
                }).then((response) => {
                    console.log(response);
                    const data = response.data.requests;
                    console.log(data);
                    setTableData(data);
                })
                .catch((error) => {
                    console.log(error);
                })
            }
    
            getTableData();
        }
    }, [userId]);

    const handlePageChange = (page : any) => {
        setCurrentPage(page);
    };

    const paginateTable = paginate(tableData, currentPage, pageSize);

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <h1>All my requests</h1>
            </Container>
            <Container>
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="col-2 text-center">Start date</th>
                            <th className="col-2 text-center">End date</th>
                            <th className="col-2 text-center">Type</th>
                            <th className="text-center">Reason</th>
                            <th className="col-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateTable.map(request => {
                            return (
                                <tr key={request.row.id}>
                                    <td>{request.row.date}</td>
                                    <td>{moment(request.row.date).add(request.count.count - 1, 'days').format('YYYY-MM-DD')}</td>
                                    <td>{request.row.type}</td>
                                    <td>{request.row.reason}</td>
                                    <td>{request.row.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Container className="d-flex justify-content-center">
                    <Pagination 
                        items={tableData.length} 
                        currentPage={currentPage} 
                        pageSize={pageSize} 
                        onPageChange={handlePageChange}
                    />
                </Container>
            </Container>
        </>
    )
}