export class Cnpj {
    public value: string
  
    private constructor(value: string) {
      this.value = value
    }
  
    static create(value: string) {
      return new Cnpj(value)
    }
  
    static createFromText(text: string): Cnpj {
      // Remove qualquer caractere que não seja um número
      const cleanedText = text.replace(/\D/g, '')
  
      // Verifica se o CNPJ tem exatamente 14 dígitos
      if (cleanedText.length !== 14) {
        throw new Error('CNPJ deve ter exatamente 14 dígitos.')
      }
  
      // Formata o CNPJ no padrão XX.XXX.XXX/XXXX-XX
      const cnpjText = `${cleanedText.slice(0, 2)}.${cleanedText.slice(2, 5)}.${cleanedText.slice(5, 8)}/${cleanedText.slice(8, 12)}-${cleanedText.slice(12, 14)}`
  
      return new Cnpj(cnpjText)
    }
  }
  