import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { Weather } from '../types'
import useWeatherStore from '../stores/useWeatherStore'
import { useEffect, useId, useState } from 'react'
import DatePicker from 'react-datepicker'

type Form = Weather & {
    startDate: Date
    endDate: Date
}

export default function AnimalManagement() {
    const [weather, setWeather] = useState<null | string>(null)
    const cropId = useId()
    const temperatureId = useId()
    const startDateId = useId()
    const endDateId = useId()
    const weathers = useWeatherStore((state) => state.weathers)
    const addWeather = useWeatherStore((state) => state.addWeather)
    const removeWeather = useWeatherStore((state) => state.removeWeather)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Form>()

    const onSubmit = handleSubmit((data) => {
        addWeather({
            ...data,
            startDate: data.startDate.getMonth().toString(),
            endDate: data.endDate.getMonth().toString(),
            id: weathers.length ? weathers[weathers.length - 1].id + 1 : 0,
        })
        reset()
    })

    useEffect(() => {
        fetch(
            'https://api.weatherapi.com/v1/current.json?key=058ed12681714414806105424230109&q=warsaw'
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setWeather('error')
                } else {
                    setWeather(res.current.temp_c)
                }
            })
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Weather INFO</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            Weather in warsaw is : {weather} C°
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="mt-3">
                        <Card.Header>
                            <Card.Title>Create Weather</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId={cropId}>
                                    <Form.Label>Crop type</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="crop"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Control
                                                placeholder="Crop type"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.crop?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId={temperatureId}
                                >
                                    <Form.Label>Temperature</Form.Label>
                                    <div className="position-relative">
                                        <Controller
                                            control={control}
                                            rules={{ required: true }}
                                            name="temperature"
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Form.Control
                                                    placeholder="Temperature"
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
                                            C°
                                        </span>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.temperature?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId={startDateId}
                                >
                                    <Form.Label>Start Date</Form.Label>
                                    <br />
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="startDate"
                                        render={({ field }) => (
                                            <DatePicker
                                                dateFormat="MM/dd"
                                                className="form-control"
                                                onChange={field.onChange}
                                                selected={field.value}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.startDate?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId={endDateId}
                                >
                                    <Form.Label>End Date</Form.Label>
                                    <br />
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        name="endDate"
                                        render={({ field }) => (
                                            <DatePicker
                                                dateFormat="MM/dd"
                                                className="form-control"
                                                onChange={field.onChange}
                                                selected={field.value}
                                            />
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.endDate?.message}
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
                            <Card.Title>Weather List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Crop type</th>
                                        <th>Temperature</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weathers.map((weather) => (
                                        <tr key={weather.id}>
                                            <td>{weather.crop}</td>
                                            <td>{weather.temperature}</td>
                                            <td>
                                                {weather.startDate} -{' '}
                                                {weather.endDate}
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        removeWeather(
                                                            weather.id
                                                        )
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
