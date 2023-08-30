import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {Weather} from '../types'
import useWeatherStore from '../stores/useWeatherStore'
import {useId} from "react";
import DatePicker from 'react-datepicker'

type Form = Weather & {
    startDate: Date
    endDate: Date
}

export default function AnimalManagement() {
    const cropId = useId()
    const temperatureId = useId()
    const startDateId = useId()
    const endDateId = useId()
    const weathers = useWeatherStore(state => state.weathers)
    const addWeather = useWeatherStore(state => state.addWeather)
    const setWeathers = useWeatherStore(state => state.setWeathers)
    const removeWeather = useWeatherStore(state => state.removeWeather)
    const {control, handleSubmit, reset, formState: {errors}} = useForm<Form>()

    const onSubmit = handleSubmit(data => {
        addWeather({...data, startDate: data.startDate.getMonth().toString(), endDate: data.endDate.getMonth().toString(), id: weathers.length ? weathers[weathers.length - 1].id + 1 : 0})
        reset()
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mt-4">
                        <Card.Header>
                            <Card.Title>Create Weather</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId={cropId}>
                                    <Form.Label>Crop type</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        name="crop"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Crop type" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.crop?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={temperatureId}>
                                    <Form.Label>Temperature</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        name="temperature"
                                        defaultValue=""
                                        render={({field}) => <Form.Control placeholder="Temperature" {...field} />}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.temperature?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={startDateId}>
                                    <Form.Label>Start Date</Form.Label>
                                    <br/>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        name="startDate"
                                        render={({field}) => <DatePicker showMonthYearPicker dateFormat="MM" className="form-control" onChange={field.onChange} selected={field.value}/>}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.startDate?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={endDateId}>
                                    <Form.Label>End Date</Form.Label>
                                    <br/>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        name="endDate"
                                        render={({field}) => <DatePicker showMonthYearPicker dateFormat="MM" className="form-control" onChange={field.onChange} selected={field.value}/>}
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
                                        <td>{weather.startDate} - {weather.endDate}</td>
                                        <td><Button onClick={() => removeWeather(weather.id)} variant="danger"
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
