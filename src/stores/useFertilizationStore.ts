import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Fertilization } from '../types'

type State = {
    fertilizations: Fertilization[]
    addFertilization: (fertilization: Fertilization) => void
    setFertilizations: (fertilizations: Fertilization[]) => void
    removeFertilization: (id: number) => void
}

const useFertilizationStore = create<State>()(
    persist(
        (set) => ({
            fertilizations: [],
            addFertilization: (fertilization) =>
                set((state) => ({
                    fertilizations: [...state.fertilizations, fertilization],
                })),
            setFertilizations: (fertilizations) => set({ fertilizations }),
            removeFertilization: (id) =>
                set((state) => ({
                    fertilizations: state.fertilizations.filter(
                        (fertilization) => fertilization.id !== id
                    ),
                })),
        }),
        {
            name: 'fertilization-storage',
        }
    )
)

export default useFertilizationStore
