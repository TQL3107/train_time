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
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        console.log(userId);
    }, [userId]);

    useEffect(() => {
        const getTableData = async() => {
            await axios.get('http://localhost:8080/api/admin/getallrequests')
            .then((response) => {
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
    }, []);

    useEffect(() => {
        const getTableData = async() => {
            await axios.get('http://localhost:8080/api/admin/getusers')
            .then((response) => {
                console.log(response);
                const data = response.data.users;
                console.log(data);
                setUserData(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        getTableData();
    }, []);

    const handleAccept = async(count : any, row : any) => {
        await axios.request({
            method: 'POST',
            url: 'http://localhost:8080/api/admin/acceptrequest',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            timeout: 5000,
            responseType: 'json',
            data: {
                id: userId,
                user_id: row.user_id,
                request_id: row.id,
                count: count,
                date: row.date
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleReject = async(count : any, row : any) => {
        await axios.request({
            method: 'POST',
            url: 'http://localhost:8080/api/admin/rejectrequest',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            timeout: 5000,
            responseType: 'json',
            data: {
                id: userId,
                user_id: row.user_id,
                request_id: row.id,
                count: count,
                date: row.date
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
        }).catch((e) => {
            console.log(e);
        })
    }

    const handlePageChange = (page : any) => {
        setCurrentPage(page);
    };

    const paginateTable = paginate(tableData, currentPage, pageSize);

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <h1>All requests</h1>
            </Container>
            <Container>
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="col-sm-2 text-center">Name</th>
                            <th className="col-sm-2 text-center">Employee Id</th>
                            <th className="col-sm-1 text-center">Start date</th>
                            <th className="col-sm-1 text-center">End date</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Reason</th>
                            <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateTable.map(request => {
                            return (
                                <tr key={request.row.id}>
                                    <td>{userData.map((user : any) => {
                                        if (user.id === request.row.user_id)
                                            return user.name;
                                    })}</td>
                                    <td>{userData.map((user: any) => {
                                        if (user.id === request.row.user_id)
                                            return user.employee_id;
                                    })}</td>
                                    <td>{request.row.date}</td>
                                    <td>{moment(request.row.date).add(request.count.count - 1, 'days').format('YYYY-MM-DD')}</td>
                                    <td>{request.row.type}</td>
                                    <td>{request.row.reason}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button className="me-2" type="button" onClick={() => handleAccept(request.count.count, request.row)}>Accept</Button>
                                            <Button className="me-2" type="button" onClick={() => handleReject(request.count.count, request.row)}>Reject</Button>
                                        </ButtonGroup>
                                    </td>
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