import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import without from 'lodash/without'
import { getNumberOfWeeks } from 'helpers/date'

function generateRandomCodes(amount) {
  return Array(amount)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2, 5).toUpperCase())
}

// TODO: refactor to store just ref and data on redux
class RestaurantService {
  constructor(private ref) {}

  async addEmptyMenuItem(): Promise<MenuItem> {
    const emptyItem: MenuItem = {
      ref: null,
      data: {
        name: '',
        description: '',
        section: '',
        optionals: [],
        pictures: [],
      },
    }
    const ref = await this.ref.collection('items').add(emptyItem.data)

    emptyItem.ref = ref
    return emptyItem
  }

  async update(...args) {
    return this.ref.update(...args)
  }

  async updatePicture(file: File) {
    const storageRef = firebase.storage().ref()

    const extension = file.name.split('.').pop()
    const pictureRef = storageRef.child(`${this.ref.id}/cover.${extension}`)

    const picSnapshot = await pictureRef.put(file)
    const url = await picSnapshot.ref.getDownloadURL()
    console.log(url)
    this.update({ coverPicture: url })

    return url
  }

  // TODO: replace this with a cloud function
  async avgSessionsPerDay(): Promise<{ [weekday: string]: number }> {
    const result = await this.ref.collection('sessions').get()
    const sessions = result.docs.map(snapshot => snapshot.data())

    const sessionDates = sessions.map(s => s.checkinAt.toDate())
    const numberOfWeeks = getNumberOfWeeks(sessionDates)

    const totalSessionsPerWeekday = sessionDates
      .map(d => d.toLocaleDateString('pt-BR', { weekday: 'long' }))
      .reduce(
        (grouped, day) => ({
          ...grouped,
          [day]: grouped[day] != null ? grouped[day] + 1 : 1,
        }),
        {}
      )

    // returns the total number of session for each day divided by the number of week
    return Object.entries(totalSessionsPerWeekday).reduce<{
      [weekday: string]: number
    }>(
      (avgPerWeekday, [weekday, numberOfSessions]) => ({
        ...avgPerWeekday,
        [weekday]: numberOfSessions
          ? <number>numberOfSessions / numberOfWeeks
          : 0,
      }),
      {}
    )
  }

  // TODO: replace this with a cloud function
  async generateCodes(amount: number) {
    if (amount > 10) {
      throw new Error("Can't generate more than 10 codes at once")
    }

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

    // await this.ref.update({ tableCodes: [...this.data.tableCodes, ...validCodes] })
    await this.ref.update({
      tableCodes: firebase.firestore.FieldValue.arrayUnion(...validCodes),
    })
    return validCodes
  }

  async getMenuItems() {
    const querySnapshot = await this.ref.collection('items').get()

    return querySnapshot.docs
  }

  static async getSnapshotByUser(
    userId: string
  ): Promise<firebase.firestore.DocumentSnapshot | null> {
    const restaurants = await firebase.firestore().collection('restaurants')

    const result = await restaurants.where('ownerId', '==', userId).get()

    if (result.empty) return null

    return result.docs[0]
  }
}

export default RestaurantService
