import {Container} from 'react-bootstrap'
import FertilizationManagement from "../components/FertilizationManagement";
import CropManagement from "../components/CropManagement";

export default function Home() {
    return (
        <Container>
            <FertilizationManagement/>
            <CropManagement/>
        </Container>
    )
}
