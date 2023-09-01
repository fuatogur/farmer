import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { Crop } from '../types'
import useCropStore from '../stores/useCropStore'
import { useId } from 'react'

export default function CropManagement() {
    const brandId = useId()
    const typeId = useId()
    const dateId = useId()
    const crops = useCropStore((state) => state.crops)
    const addCrop = useCropStore((state) => state.addCrop)
    const removeCrop = useCropStore((state) => state.removeCrop)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Crop>()

    const onSubmit = handleSubmit((data) => {
        addCrop({
            ...data,
            id: crops.length ? crops[crops.length - 1].id + 1 : 0,
        })
        reset()
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Create Crop</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId={brandId}
                                >
                                    <Form.Label>Crop brand</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="brand"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                placeholder="Crop brand"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={typeId}>
                                    <Form.Label>Crop type</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="type"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                placeholder="Crop type"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.type?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={dateId}>
                                    <Form.Label>Crop date</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="date"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                type="date"
                                                {...field}
                                            />
                                        )}
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
                                        <th>Brand</th>
                                        <th>Crop Type</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {crops.map((crop) => (
                                        <tr key={crop.id}>
                                            <td>{crop.brand}</td>
                                            <td>{crop.type}</td>
                                            <td>{crop.date}</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        removeCrop(crop.id)
                                                    }
                                                    variant="danger"
                                                    size="sm"
                                                >
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card
                        className="mt-3 mb-3"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                    >
                        <Card.Header>
                            <Card.Title>NOTE</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
