import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import without from 'lodash/without'

const proxyHandler = {
  get: function (target, prop, receiver) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)

    return target.snapshot.data()[prop]
  },
}

function generateRandomCodes(amount) {
  return Array(amount)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2, 5).toUpperCase())
}

class Restaurant {
  snapshot
  data

  constructor(snapshot) {
    this.snapshot = snapshot
    this.data = this.snapshot.data()
  }

  async update(...args) {
    return this.snapshot.ref.update(...args)
  }

  async updatePicture(file: File) {
    const storageRef = firebase.storage().ref()

    const extension = file.name.split('.').pop()
    const pictureRef = storageRef.child(
      `${this.snapshot.id}/cover.${extension}`
    )

    const picSnapshot = await pictureRef.put(file)
    const url = await picSnapshot.ref.getDownloadURL()
    this.update({ coverPicture: url })

    return url
  }

  async generateCodes(amount: number) {
    if (amount > 10)
      throw new Error("Can't generate more than 10 codes at once")

    const restaurants = await firebase.firestore().collection('restaurants')

    let validCodes: string[] = []
    let amountToGenerateLeft = amount

    let i = 0 // just in case heh
    while (validCodes.length < amount && i++ < 20) {
      const generatedCodes = generateRandomCodes(amountToGenerateLeft)

      const result = await restaurants
        .where('tableCodes', 'array-contains-any', generatedCodes)
        .get()

      // filter only codes that conflict with the generated ones
      const conflictingCodes = result.docs
        .flatMap(snapshot => snapshot.data().tableCodes)
        .filter(conflictingCode =>
          generatedCodes.some(code => conflictingCode === code)
        )

      // remove generated conflicting codes
      const foundValidCodes = without(generatedCodes, ...conflictingCodes)
      validCodes.push(...foundValidCodes)

      amountToGenerateLeft = conflictingCodes.length
    }

    await this.update({ tableCodes: [...this.data.tableCodes, ...validCodes] })
    return validCodes
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
