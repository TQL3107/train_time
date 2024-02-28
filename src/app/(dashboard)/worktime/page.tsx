'use client'

import { Form, Container, Col, Row, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Pagination from "../Components/pagination/Pagination";
import {paginate} from '../utils/paginate';
import axios from "axios";
import moment from "moment";
import FileUpload from "../Components/FileUpload";

export default function worktime() {

    const [id, setId] = useState<string | null>('');
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sortOption, setSortOption] = useState('ASC');
    const [optionMonth, setOptionMonth] = useState(0);
    const [searchOption, setSearchOption] = useState(0);
    const [records, setRecords] = useState(0);
    const [tableData, setTableData] = useState([]);

    const tableColumns = [
        {schema: 'no', title: 'No'},
        {schema: 'date', title: 'Date'},
        {schema: 'check_in', title: 'Check_in'},
        {schema: 'check_out', title: 'Check_out'},
        {schema: 'late', title: 'Late'},
        {schema: 'early', title: 'Early'},
        {schema: 'work_time', title: 'Work time'},
    ];

    const morning_in = '08:30:00';
    const morning_out = '12:00:00';
    const afternoon_in = '13:00:00';
    const afternoon_out = '17:30:00';

    useEffect(() => {
        setId(localStorage.getItem('userId'));
        if (id) {
            console.log(id);
            
        }
    }, [id]);

    const searchByMonth = async(id : any) => {
        if (optionMonth === 0) {
            axios.get('http://localhost:8080/api/worktime/thismonth', {
                params: {
                    id: id,
                    orderBy: sortOption
                }
            }).then((res) => {
                const data = res.data.workTime.rows;
                const number = res.data.workTime.count;
                setRecords(number);
                console.log(data);
                setTableData(data);
            }).catch((error) => {
                console.log(error);
            })
        } else if (optionMonth === 1) {
            axios.get('http://localhost:8080/api/worktime/lastmonth', {
                params: {
                    id: id,
                    orderBy: sortOption
                }
            }).then((res) => {
                const data = res.data.workTime.rows;
                const number = res.data.workTime.count;
                setRecords(number);
                console.log(data);
                setTableData(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const searchByDate = async(id:any) => {
        axios.get('http://localhost:8080/api/worktime/bydate', {
                params: {
                    id: id,
                    startDate: startDate,
                    endDate: endDate,
                    orderBy: sortOption
                }
            }).then((res) => {
                const data = res.data.workTime.rows;
                const number = res.data.workTime.count;
                setRecords(number);
                console.log(data);
                setTableData(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const searchAll = async(id:any) => {
        axios.get('http://localhost:8080/api/worktime', {
            params: {
                id: id,
                orderBy: sortOption
            }
        }).then((res) => {
            const data = res.data.workTime.rows;
            const number = res.data.workTime.count;
            setRecords(number);
            console.log(data);
            setTableData(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleImport = () => {
        
    }

    const handleSubmit = () => {
        if (searchOption === 1) {
            searchByMonth(id);
        } else if (searchOption === 2) {
            searchByDate(id);
        } else {
            searchAll(id);
        }
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    const handleSelectPageSize = (e:any) => {
        setPageSize(e.target.value);
        setCurrentPage(1);
        console.log(pageSize);  
    }

    const handlePageChange = (page : any) => {
        setCurrentPage(page);
    };

    const dataTable = paginate(tableData, currentPage, pageSize);

    const diffTime = (a: String, b: String) => {
        const day_a = new Date('1 Jan 2000 ' + a);
        const day_b = new Date('1 Jan 2000 ' + b);
        return (day_a.getTime() - day_b.getTime()) / (1000 * 60);
    }

    const transMinuteToHour = (minutes: any) => {
        const hour = Math.floor(minutes / 60);
        const remainminute = minutes % 60;
        return `${hour}:${remainminute}`;
    }

    const formatTime = (a:string) => {
        const day_a = moment(new Date('1 Jan 2000 ' + a));
        return day_a.format('HH:mm').toLowerCase();
    }

    return (
        <>
            <Container className="">
                <Container className="justify-content-end d-flex mt-3">
                    <FileUpload />
                </Container>
                <Form className="border border-dark mt-3 p-3 bg-white">
                    <Form.Group as={Row}>
                        <Form.Label className="col-2">
                            Choose type of list by:
                        </Form.Label>
                        <Col sm='1'>
                            <Form.Check type="radio" label='Month' name="typeoflist" value={1}
                                onChange={(e:any) => setSearchOption(parseInt(e.target.value))} />
                            <Form.Check type="radio" label='Day' name="typeoflist" className="mt-4" value={2}
                                onChange={(e:any) => setSearchOption(parseInt(e.target.value))} />
                        </Col>
                        <Col sm='3' className="ms-3">
                            <Form.Select size="sm" className="mb-3" defaultValue={optionMonth} onChange={(e:any) => setOptionMonth(parseInt(e.target.value))}>
                                <option value={0} >This month</option>
                                <option value={1} >Last month</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Label>From:</Form.Label>
                                <Form.Control type="date" size="sm" onChange={(e:any) => setStartDate(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>To:</Form.Label>
                                <Form.Control type="date" size="sm" onChange={(e:any) => setEndDate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Form.Group as={Row}>
                                <Form.Label className="col-sm-6 p-0">Sort by work date:</Form.Label>
                                <Col sm='6'>
                                    <Form.Select size="sm" defaultValue={sortOption} onChange={(e:any) => {setSortOption(e.target.value)}}>
                                        <option value={'ASC'}>Ascending</option>
                                        <option value={'DESC'}>Descending</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Container className="d-flex justify-content-center mt-3">
                        <Button onClick={handleSubmit}>Search</Button>
                        <Button className="me-2 mx-2" onClick={handleRefresh}>Reset</Button>
                        <Button>Export Excel</Button>
                    </Container>
                </Form>
            </Container>
            <Container className="">
                <Container className="mt-3 bg-white border border-dark">
                    <Row className="mt-2">
                        <Col>
                            <label>Total number of records: {records}</label>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            <label className="me-2">Sort by work date:</label>
                            <select defaultValue={pageSize} onChange={(e) => handleSelectPageSize(e)}>
                                <option value={10}>--10--</option>
                                <option value={25}>--25--</option>
                                <option value={50}>--50--</option>
                                <option value={100}>--100--</option>
                            </select>
                        </Col>
                    </Row>
                    <Table bordered size="sm" className="mt-2" >
                        <thead>
                            <tr>
                                {tableColumns.map(column => {
                                    return (
                                        <th key={column.schema}>{column.title}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map(data => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{moment(new Date(data.date)).format('YYYY-MM-DD ddd')}</td>
                                        <td>{(data.check_in === '00:00:00' ? '' : formatTime(data.check_in))}</td>
                                        <td>{(data.check_out === '00:00:00' ? '' : formatTime(data.check_out))}</td>
                                        <td>{(data.check_in > morning_in ? formatTime(transMinuteToHour(diffTime(data.check_in, morning_in))) : '')}</td>
                                        <td>{(data.check_out < afternoon_out && data.check_in != '00:00:00' ? formatTime(transMinuteToHour(diffTime(afternoon_out, data.check_out))) : '')}</td>
                                        <td>{data.check_in != '00:00:00' ? (formatTime(transMinuteToHour(diffTime(data.check_out, data.check_in) - 60 ))) : ''}</td>
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
            </Container>
        </>
    )
}