export class Phone {
    public value: string
  
    private constructor(value: string) {
      this.value = value
    }
  
    static create(value: string) {
      return new Phone(value)
    }
  
    static createFromText(text: string): Phone {
      // Remove qualquer caractere que não seja um número
      const cleanedText = text.replace(/\D/g, '')
  
      // Verifica se o telefone tem 10 ou 11 dígitos (com ou sem o nono dígito)
      if (cleanedText.length !== 10 && cleanedText.length !== 11) {
        throw new Error('O telefone deve ter 10 ou 11 dígitos.')
      }
  
      let formattedPhone: string
  
      // Formata o número de telefone com DDD (sem nono dígito)
      if (cleanedText.length === 10) {
        formattedPhone = `(${cleanedText.slice(0, 2)}) ${cleanedText.slice(2, 6)}-${cleanedText.slice(6, 10)}`
      } else {
        // Formata o número de telefone com DDD e nono dígito
        formattedPhone = `(${cleanedText.slice(0, 2)}) ${cleanedText.slice(2, 7)}-${cleanedText.slice(7, 11)}`
      }
  
      return new Phone(formattedPhone)
    }
  }
  