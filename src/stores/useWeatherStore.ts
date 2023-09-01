import { create } from 'zustand'
import { Weather } from '../types'
import { persist } from 'zustand/middleware'

type State = {
    weathers: Weather[]
    addWeather: (weather: Weather) => void
    setWeathers: (weathers: Weather[]) => void
    removeWeather: (id: number) => void
}

const useWeatherStore = create<State>()(
    persist(
        (set) => ({
            weathers: [],
            addWeather: (weather) =>
                set((state) => ({ weathers: [...state.weathers, weather] })),
            setWeathers: (weathers) => set({ weathers }),
            removeWeather: (id) =>
                set((state) => ({
                    weathers: state.weathers.filter(
                        (weather) => weather.id !== id
                    ),
                })),
        }),
        {
            name: 'weather-storage',
        }
    )
)

export default useWeatherStore
