export function generateFakePhone(): string {
    const generateRandomNumbers = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
  
    const ddd = "11" // DDD fixo como 11 para São Paulo
    const firstDigit = "9" // Prefixo para números de celular no Brasil, começando com 9
    const phoneWithoutFormat = `${ddd}${firstDigit}${generateRandomNumbers(8)}`
  
    const formattedPhone = `(${phoneWithoutFormat.slice(0, 2)}) ${phoneWithoutFormat.slice(2, 7)}-${phoneWithoutFormat.slice(7, 11)}`
  
    return formattedPhone
}
  