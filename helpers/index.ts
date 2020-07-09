export async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const isHttp = url => /^http/.test(url)

export const formatMoney = value =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)

export const createKeyGenerator = () => {
  let key = 0
  return () => key++
}
