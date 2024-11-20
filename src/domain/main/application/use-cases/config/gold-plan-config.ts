interface GOLD_PLAN_CONFIG_TYPE {
  description: string
  category: 'GOLD' | 'SILVER' | 'BRONZE'
  cancellationPolicy: number
  perks: string[]
  price: number
}

export const GOLD_PLAN_CONFIG: GOLD_PLAN_CONFIG_TYPE = {
  description:
    'Com nosso plano GOLD você tem direito a fazer quantos check-ins desejar e em qualquer academia do nosso grupo com serviço 24h, também descontos exclusivos nas nossas lojas. Além disso tem a acesso a mentorias online premium com nossos profissionais como personal trainers, nutricionistas e fisioterapeutas.',
  category: 'GOLD',
  cancellationPolicy: 10,
  perks: [
    'Personal Trainer',
    'Nutricionista',
    'Fisioterapeuta',
    'Check-ins Ilimitados',
    'Acesso Total',
    'Descontos até 50%',
    'Academia 24h',
  ],
  price: 150,
}
