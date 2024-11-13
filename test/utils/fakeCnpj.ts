export function generateFakeCNPJ(): string {
    const generateRandomNumbers = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 9)).join('')
  
    const cnpjWithoutCheckDigits = generateRandomNumbers(8) + "0001" // Raiz (8 dígitos) + Filial (0001)
  
    const calculateCheckDigit = (cnpj: string) => {
      const weights = cnpj.length === 12 
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] 
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  
      const sum = cnpj
        .split('')
        .reduce((total, digit, index) => total + parseInt(digit) * weights[index], 0)
  
      const rest = sum % 11
      return rest < 2 ? 0 : 11 - rest
    }
  
    const firstCheckDigit = calculateCheckDigit(cnpjWithoutCheckDigits)
    const secondCheckDigit = calculateCheckDigit(cnpjWithoutCheckDigits + firstCheckDigit)
  
    const formattedCNPJ = `${cnpjWithoutCheckDigits}${firstCheckDigit}${secondCheckDigit}`
  
    return `${formattedCNPJ.slice(0, 2)}.${formattedCNPJ.slice(2, 5)}.${formattedCNPJ.slice(5, 8)}/${formattedCNPJ.slice(8, 12)}-${formattedCNPJ.slice(12, 14)}`
  }
  