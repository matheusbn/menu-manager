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

interface MenuItem {
  ref: firebase.firestore.DocumentReference | null
  data: {
    name: string
    description: string
    price?: number
    pictures: string[]
    section: string
    optionals: Optional[]
  }
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

interface Restaurant {
  ref: firebase.firestore.DocumentReference
  data: RestaurantData
}

interface RestaurantData {
  name: string
  name: string
  coverPicture: string
  foodType: string
  maxCapacity: number
  tableCodeMap: {
    [code: string]: string
  }
  address: {
    city: string
    state: string
    street: string
    number: string
    complement: string
  }
  tableCodes: string[]
}
