export type Fertilization = {
    id: number
    brand: string
    type: string
    crop: string
    date: string
}

export type Crop = {
    id: number
    brand: string
    type: string
    date: string
}

export type Efficiency = {
    id: number
    brand: string
    type: string
    fertilization: string
    efficiency: string
    date: string
}

export type Animal = {
    id: number
    number: string
    milkAmount: string
    date: string
}

export type Weather = {
    id: number
    crop: string
    temperature: string
    startDate: string
    endDate: string
}
