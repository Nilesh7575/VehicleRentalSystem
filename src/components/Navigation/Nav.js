import React from 'react'
import { Container, Navbar } from 'react-bootstrap'








function Nav() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Centralize Reservation System</Navbar.Brand>
                    
                </Container>
            </Navbar>
        </div>
    )
}

export default Nav