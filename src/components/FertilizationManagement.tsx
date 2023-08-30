import {Row, Col, Form, Button, Table, Card} from 'react-bootstrap'
import useFertilizationStore from '../stores/useFertilizationStore'
import {Controller, useForm} from 'react-hook-form'
import {Fertilization} from '../types'
import {useId} from "react";

export default function FertilizationManagement() {
    const brandId = useId()
    const typeId = useId()
    const cropId = useId()
    const dateId = useId()
    const fertilizations = useFertilizationStore(state => state.fertilizations)
    const addFertilization = useFertilizationStore(state => state.addFertilization)
    const setFertilizations = useFertilizationStore(state => state.setFertilizations)
    const removeFertilization = useFertilizationStore(state => state.removeFertilization)
    const {control, handleSubmit, reset, formState: {errors}} = useForm<Fertilization>()

    const onSubmit = handleSubmit(data => {
        addFertilization({...data, id: fertilizations.length ? fertilizations[fertilizations.length - 1].id + 1 : 0})
        reset()
    })

    return (
        <>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Create Fertilization</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId={brandId}>
                                    <Form.Label>Fertilizer brand</Form.Label>
                                    <Controller control={control} rules={{required: true}} name="brand" defaultValue=""
                                                render={({field}) => <Form.Control
                                                    placeholder="Fertilizer brand" {...field} />}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={typeId}>
                                    <Form.Label>Type of fertilizer</Form.Label>
                                    <Controller control={control} rules={{required: true}} name="type" defaultValue=""
                                                render={({field}) => <Form.Control
                                                    placeholder="Type of fertilizer" {...field}/>}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.type?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={cropId}>
                                    <Form.Label>Name of the cultivated crop</Form.Label>
                                    <Controller control={control} rules={{required: true}} name="crop" defaultValue=""
                                                render={({field}) => <Form.Control
                                                    placeholder="Name of the cultivated crop" {...field}/>}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.crop?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={dateId}>
                                    <Form.Label>Fertilization date</Form.Label>
                                    <Controller control={control} rules={{required: true}} name="date" defaultValue=""
                                                render={({field}) => <Form.Control type="date" {...field}/>}/>
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
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Fertilization List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Type</th>
                                    <th>Crop</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fertilizations.map((fertilization) => (
                                    <tr key={fertilization.id}>
                                        <td>{fertilization.brand}</td>
                                        <td>{fertilization.type}</td>
                                        <td>{fertilization.crop}</td>
                                        <td>{fertilization.date}</td>
                                        <td><Button onClick={() => removeFertilization(fertilization.id)} variant="danger" size="sm">Remove</Button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
