export interface Location {
  address: string
  lat: number
  lng: number
}

export interface Ride {
  id?: string
  rideName: string
  startLocation: Location
  endLocation: Location
  distance: number
  drivers: string[]
  assistants: string[]
  vehicle: string
  startDateTime?: string
  endDateTime?: string
  totalSeats?: number
}
