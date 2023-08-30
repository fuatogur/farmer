import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {Efficiency} from '../types'
import useEfficiencyStore from '../stores/useEfficiencyStore'
import {useId} from "react";

export default function EfficiencyManagement() {
    const brandId = useId()
    const typeId = useId()
    const fertilizationId = useId()
    const efficiencyId = useId()
    const dateId = useId()
    const efficiencies = useEfficiencyStore(state => state.efficiencies)
    const addEfficiency = useEfficiencyStore(state => state.addEfficiency)
    const setEfficiencies = useEfficiencyStore(state => state.setEfficiencies)
    const removeEfficiency = useEfficiencyStore(state => state.removeEfficiency)
    const {control, handleSubmit, reset, formState: {errors}} = useForm<Efficiency>()

    const onSubmit = handleSubmit(data => {
        addEfficiency({...data, id: efficiencies.length ? efficiencies[efficiencies.length - 1].id + 1 : 0})
        reset()
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Create Efficiency</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId={brandId}>
                                    <Form.Label>Crop brand</Form.Label>
                                    <Controller
                                        control={control} rules={{required: true}}
                                        name="brand"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Crop brand" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={typeId}>
                                    <Form.Label>Crop type</Form.Label>
                                    <Controller
                                        control={control} rules={{required: true}}
                                        name="type"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Crop type" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.type?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={fertilizationId}>
                                    <Form.Label>Fertilization</Form.Label>
                                    <Controller
                                        control={control} rules={{required: true}}
                                        name="fertilization"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Fertilization" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fertilization?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={efficiencyId}>
                                    <Form.Label>Efficiency</Form.Label>
                                    <Controller
                                        control={control} rules={{required: true}}
                                        name="efficiency"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Efficiency" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.efficiency?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={dateId}>
                                    <Form.Label>Date</Form.Label>
                                    <Controller
                                        control={control} rules={{required: true}}
                                        name="date"
                                        defaultValue=""
                                        render={({field}) => <Form.Control type="date" placeholder="Date" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.date?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className="me-1" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="my-4">
                        <Card.Header>
                            <Card.Title>Crop List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Crop brand</th>
                                    <th>Crop type</th>
                                    <th>Fertilization</th>
                                    <th>Efficiency</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {efficiencies.map((efficiency) => (
                                    <tr key={efficiency.id}>
                                        <td>{efficiency.brand}</td>
                                        <td>{efficiency.type}</td>
                                        <td>{efficiency.fertilization}</td>
                                        <td>{efficiency.efficiency}</td>
                                        <td>{efficiency.date}</td>
                                        <td><Button onClick={() => removeEfficiency(efficiency.id)} variant="danger"
                                                    size="sm">Remove</Button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
