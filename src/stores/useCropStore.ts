import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Crop } from '../types'

type State = {
    crops: Crop[]
    addCrop: (fertilization: Crop) => void
    setCrops: (fertilizations: Crop[]) => void
    removeCrop: (id: number) => void
}

const useCropStore = create<State>()(
    persist(
        (set) => ({
            crops: [],
            addCrop: (crop) =>
                set((state) => {
                    const crops = [...state.crops, crop]

                    localStorage.setItem('crops', JSON.stringify(crops))

                    return { crops }
                }),
            setCrops: (crops) => set({ crops }),
            removeCrop: (id) =>
                set((state) => ({
                    crops: state.crops.filter((crop) => crop.id !== id),
                })),
        }),
        {
            name: 'crop-storage',
        }
    )
)

export default useCropStore
