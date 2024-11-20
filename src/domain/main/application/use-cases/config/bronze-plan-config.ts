interface BRONZE_PLAN_CONFIG_TYPE {
  description: string
  category: 'GOLD' | 'SILVER' | 'BRONZE'
  cancellationPolicy: number
  perks: string[]
  price: number
}

export const BRONZE_PLAN_CONFIG: BRONZE_PLAN_CONFIG_TYPE = {
  description:
    'Com o plano BRONZE, você dá o pontapé inicial para uma rotina de exercícios mais saudável e equilibrada, sem comprometer o seu bolso. Ideal para quem busca praticidade e quer começar a cuidar da sua saúde, o plano BRONZE oferece tudo o que você precisa para alcançar seus objetivos. Descontos exclusivos de 25%, 1 check-in por dia e Acesso durante o horário comercial',
  category: 'BRONZE',
  cancellationPolicy: 10,
  perks: [
    '1 Check-in por dia ',
    'Acesso Restrito',
    'Descontos até 25%',
    'Academia Horário Comercial',
  ],
  price: 100,
}
