import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import EfficiencyManagement from './pages/EfficiencyManagement'
import AnimalManagement from './pages/AnimalManagement'
import WeatherManagement from './pages/WeatherManagement'
import FertilizationManagement from './pages/FertilizationManagement'
import CropManagement from './pages/CropManagement'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'fertilization',
                element: <FertilizationManagement />,
            },
            {
                path: 'crop',
                element: <CropManagement />,
            },
            {
                path: 'efficiency',
                element: <EfficiencyManagement />,
            },
            {
                path: 'animal',
                element: <AnimalManagement />,
            },
            {
                path: 'weather',
                element: <WeatherManagement />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
