import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Efficiency } from '../types'

type State = {
    efficiencies: Efficiency[]
    addEfficiency: (efficiency: Efficiency) => void
    setEfficiencies: (efficiencies: Efficiency[]) => void
    removeEfficiency: (id: number) => void
}

const useEfficiencyStore = create<State>()(
    persist(
        (set) => ({
            efficiencies: [],
            addEfficiency: (efficiency) =>
                set((state) => ({
                    efficiencies: [...state.efficiencies, efficiency],
                })),
            setEfficiencies: (efficiencies) => set({ efficiencies }),
            removeEfficiency: (id) =>
                set((state) => ({
                    efficiencies: state.efficiencies.filter(
                        (efficiency) => efficiency.id !== id
                    ),
                })),
        }),
        {
            name: 'efficiency-store',
        }
    )
)

export default useEfficiencyStore
