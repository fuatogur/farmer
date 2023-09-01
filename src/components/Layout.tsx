import { NavLink, Outlet } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Layout() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Nav>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/fertilization">
                            Fertilization Management
                        </NavLink>
                        <NavLink className="nav-link" to="/crop">
                            Crop Management
                        </NavLink>
                        <NavLink className="nav-link" to="/efficiency">
                            Efficiency Management
                        </NavLink>
                        <NavLink className="nav-link" to="/animal">
                            Animal Management
                        </NavLink>
                        <NavLink className="nav-link" to="/weather">
                            Weather Management
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
