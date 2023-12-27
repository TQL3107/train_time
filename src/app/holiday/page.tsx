'use client'

import { Container, Table, Row, Col, Button } from "react-bootstrap";
import './page.css'
import { useEffect, useState } from "react";

export default function holidayCalendar() {
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());

    useEffect (() => {
        generateCalendar()
    }, [month]);

    const generateCalendar = () => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();

        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const daysArray = [];

        // Fill in the days of the previous month
        for (let i = firstDayIndex; i > 0; i--) {
            daysArray.push(prevMonthLastDay - i + 1);
        }

        // Fill in the days of the current month
        for (let i=1; i<=daysInMonth; i++){
            daysArray.push(i);
        }

        // Fill in the days of the next month
        for (let i = 1; i < 7 - lastDayIndex; i++) {
            daysArray.push(i);
          }

        const calendar = (
            <Container as={Row}>
                <Col sm="6">
                    <Table >
                        <thead>
                            <tr className="text-center" >
                                <th colSpan={7} >
                                    <div className="row">
                                        <div className="col-2">
                                            <Button onClick={goPreviousMonth} id="prebtn" size="sm"><i className="bi bi-caret-left-fill"></i></Button>
                                        </div>
                                        <div className="col">
                                        {nameOfMonth(month)}
                                        </div>
                                        <div className="col-2">
                                            <Button onClick={goNextMonth} id="nextbtn" size="sm"><i className="bi bi-caret-right-fill"></i></Button>
                                        </div>
                                    </div>    
                                </th>
                                
                            </tr>
                            <tr className="text-center">
                                <th scope="col">Sun</th>
                                <th scope="col">Mon</th>
                                <th scope="col">Tue</th>
                                <th scope="col">Wed</th>
                                <th scope="col">Thu</th>
                                <th scope="col">Fri</th>
                                <th scope="col">Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chunkArray(daysArray, 7).map((row, rowIndex) => (
                                <tr key={rowIndex} className="text-center">
                                    {row.map((day:any, dayIndex:any) => (
                                        <td key={dayIndex}>{day}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h6>Holiday Event:</h6>
                </Col>
            </Container>
        )
         
        return calendar;
    }

    const chunkArray = (arr : any, size : any) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const nameOfMonth = (month : any) => {
        switch (month) {
            case 0 : 
                return 'January';
                break;
            case 1 : 
                return 'February';
                break;
            case 2 : 
                return 'March';
                break;
            case 3 : 
                return 'April';
                break;
            case 4 : 
                return 'May';
                break;
            case 5 : 
                return 'June';
                break;
            case 6 : 
                return 'July';
                break;
            case 7 : 
                return 'August';
                break;
            case 8 : 
                return 'Septemper';
                break;
            case 9 : 
                return 'October';
                break;
            case 10 : 
                return 'November';
                break;
            case 11 : 
                return 'December';
                break;
            case 12 :
                setMonth(0);
                setYear(year+1);
                break;
            case -1 :
                setMonth(11);
                setYear(year-1);
                break;
        }
    }

    const goNextMonth = () => {
        setMonth(month+1);
    }

    const goPreviousMonth = () => {
        setMonth(month-1);
    }
    return (
        <>
            <Container>
                <h2 className="ms-5 mt-3">{ year } Calendar</h2>
                {generateCalendar()}
            </Container>
        </>
    )
    
}