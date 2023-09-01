import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Animal } from '../types'

type State = {
    animals: Animal[]
    addAnimal: (animal: Animal) => void
    setAnimals: (animals: Animal[]) => void
    removeAnimal: (id: number) => void
}

const useAnimalStore = create<State>()(
    persist(
        (set) => ({
            animals: [],
            addAnimal: (animal) =>
                set((state) => {
                    const animals = [...state.animals, animal]

                    localStorage.setItem('animals', JSON.stringify(animals))

                    return { animals }
                }),
            setAnimals: (animals) => set({ animals }),
            removeAnimal: (id) =>
                set((state) => ({
                    animals: state.animals.filter((animal) => animal.id !== id),
                })),
        }),
        {
            name: 'animal-storage',
        }
    )
)

export default useAnimalStore
