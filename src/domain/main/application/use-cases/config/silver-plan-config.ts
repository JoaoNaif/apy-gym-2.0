interface SILVER_PLAN_CONFIG_TYPE {
  description: string
  category: 'GOLD' | 'SILVER' | 'BRONZE'
  cancellationPolicy: number
  perks: string[]
  price: number
}

export const SILVER_PLAN_CONFIG: SILVER_PLAN_CONFIG_TYPE = {
  description:
    'Com o plano SILVER, você tem flexibilidade e praticidade para cuidar da sua saúde, sem abrir mão dos benefícios exclusivos que só a nossa academia oferece. Acesso 24 horas, Rede completa de academias e Descontos exclusivos',

  category: 'SILVER',
  cancellationPolicy: 10,
  perks: [
    '1 Check-in por dia',
    'Acesso Total',
    'Descontos até 50%',
    'Academia 24h',
  ],
  price: 125,
}
