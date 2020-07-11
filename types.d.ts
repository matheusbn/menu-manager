interface Option {
  name: string
  price?: number
}

interface Optional {
  name: string
  options: Option[]
  required: {
    min?: number
    max?: number
  }
}

interface Item {
  id: string
  name: string
  description: string
  price: number
  pictures: string[]
  section: string
  optionals: Optional[]
}

interface SelectedOptionals {
  [index: string]: Option[] | Option
}

interface ItemOrder {
  item: {
    id: string
    name: string
  }
  amount: number
  selectedOptionals: SelectedOptionals
  observation: string
  price: number
}

interface Order {
  items: ItemOrder[]
  orderedAt?: Date
}

interface RestaurantData {
  name: string
  coverPicture: string
  foodType: string
  maxCapacity: number
  address: {
    city: string
    state: string
    street: string
    number: string
    complement: string
  }
  tableCodes: string[]
}
