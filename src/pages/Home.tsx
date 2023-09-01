import { Card, Col, Container, Row } from 'react-bootstrap'

export default function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card
                        className="mt-3"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                    >
                        <Card.Header>
                            <Card.Title>NOTE</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            This app was created for farmers. With this app, farmers can manage their farms.
                            They will be able to keep track of the crops they have sown. They will no longer need to take notes in their notebooks.
                            With fertilizer control, they will be able to track their fertilization.
                            With yield control, they will be able to track how much yield they get from products.
                            With animal control, they will be able to track the yields of their animals on a monthly basis.
                            With weather control, they will be able to control which crops they can plant at what time and at what temperature.

                            All you need to do is enter the necessary information manually on the required page. This information will then be listed. You will be able to access the information you want at any time.
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
