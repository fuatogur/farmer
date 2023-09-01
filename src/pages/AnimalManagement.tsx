import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { Animal } from '../types'
import useAnimalStore from '../stores/useAnimalStore'
import { useId } from 'react'

export default function AnimalManagement() {
    const numberId = useId()
    const milkAmountId = useId()
    const dateId = useId()
    const animals = useAnimalStore((state) => state.animals)
    const addAnimal = useAnimalStore((state) => state.addAnimal)
    const removeAnimal = useAnimalStore((state) => state.removeAnimal)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Animal>()

    const onSubmit = handleSubmit((data) => {
        addAnimal({
            ...data,
            id: animals.length ? animals[animals.length - 1].id + 1 : 0,
        })
        reset({
            milkAmount: '0',
        })
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Create Animal</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId={numberId}
                                >
                                    <Form.Label>Animal number</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="number"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                placeholder="Animal number"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.number?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId={milkAmountId}
                                >
                                    <Form.Label>Milk Amount</Form.Label>
                                    <div className="position-relative">
                                        <Controller
                                            control={control}
                                            rules={{ required: true }}
                                            name="milkAmount"
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Form.Control
                                                    placeholder="Milk Amount"
                                                    type="number"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                padding: '6px 20px',
                                                right: 0,
                                                top: 0,
                                            }}
                                        >
                                            KG
                                        </span>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.milkAmount?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={dateId}>
                                    <Form.Label>Date</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="date"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                type="date"
                                                placeholder="Date"
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
                            <Card.Title>Animal List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Animal number</th>
                                        <th>Milk amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {animals.map((animal) => (
                                        <tr key={animal.id}>
                                            <td>{animal.number}</td>
                                            <td>{animal.milkAmount}</td>
                                            <td>{animal.date}</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        removeAnimal(animal.id)
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
