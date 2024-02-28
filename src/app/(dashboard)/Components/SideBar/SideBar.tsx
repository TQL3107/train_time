'use client'

import { Container, ListGroup } from "react-bootstrap"
import './SideBar.css';

export default function MenuBar() {
    const active = true;

    return (
        <>
            <ListGroup className="mt-3 border border-dark">
                <ListGroup.Item className="bg-dark text-white">
                    Menu
                </ListGroup.Item>
                <ListGroup.Item action href="/profile" className="btn btn-no-border">
                    Profile
                </ListGroup.Item>
                <ListGroup.Item action href="/holiday" className="btn btn-no-border">
                    Holiday
                </ListGroup.Item>
                <ListGroup.Item action href="/leaverequest" className="btn btn-no-border">
                    Leave requests
                </ListGroup.Item>
                <ListGroup.Item action href="/worktime" className="btn btn-no-border">
                    Worktime
                </ListGroup.Item>
                {!active ? '' : <ListGroup.Item action href="/staff" className="btn btn-no-border">
                                    Staff
                                </ListGroup.Item>
                }
                <ListGroup.Item action href="/" className="btn btn-no-border">
                    Setting
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}