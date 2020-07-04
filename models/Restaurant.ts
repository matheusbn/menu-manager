import firebase from 'firebase/app'
import 'firebase/firestore'

const proxyHandler = {
  get: function (target, prop, receiver) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)

    return target.snapshot.data()[prop]
  },
}

class Restaurant {
  snapshot

  constructor(snapshot) {
    this.snapshot = snapshot
  }

  get name(): string {
    return this.snapshot.data().name
  }

  get foodType(): string {
    return this.snapshot.data().foodType
  }

  get address(): object {
    console.log(this.snapshot.data().address)
    return this.snapshot.data().address
  }

  get coverPicture(): string {
    return this.snapshot.data().coverPicture
  }

  get maxCapacity(): number {
    return this.snapshot.data().maxCapacity
  }

  get tableCodes(): string[] {
    console.log(this.snapshot.data())
    return this.snapshot.data().tableCodes
  }

  async getMenuItems() {
    const querySnapshot = await this.snapshot.ref.collection('items').get()

    return querySnapshot.docs.map(snapshot => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))
  }

  static async fromUser(userId: string): Promise<Restaurant | null> {
    const restaurants = await firebase.firestore().collection('restaurants')

    const result = await restaurants.where('ownerId', '==', userId).get()

    if (result.empty) return null

    const restaurantSnapshot = result.docs[0]
    return new Restaurant(restaurantSnapshot)
  }
}

export default Restaurant
