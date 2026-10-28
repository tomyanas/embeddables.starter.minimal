export type Energia = 'calma' | 'juego'
export type Hogar = 'depto' | 'casa'
export type Compania = 'siesta' | 'travesura'

export type Answers = {
  energia?: Energia
  hogar?: Hogar
  compania?: Compania
}

export type Kitten = {
  id: string
  name: string
  coat: string
  age: string
  home: Hogar
  mood: Energia
  line: string
  story: string
  fur: string
  ear: string
}

export const kittens = [
  {
    id: 'lua',
    name: 'Lúa',
    coat: 'Gris perla',
    age: '8 meses',
    home: 'depto',
    mood: 'calma',
    line: 'El rectángulo de sol de la ventana ya tiene dueña.',
    story:
      'Se instala ahí a la tarde y solo se mueve si le ofrecés la mano. Ideal si tu casa es quieta y el sillón es el lugar más importante.',
    fur: '#c7bfb4',
    ear: '#a89b90',
  },
  {
    id: 'miso',
    name: 'Miso',
    coat: 'Naranja atigrado',
    age: '5 meses',
    home: 'depto',
    mood: 'juego',
    line: 'Persigue tapas, cordones y después se queda dormido encima.',
    story:
      'En un departamento chico alcanza para una carrera entera. Cuando se cansa, elige una falda y no negocia.',
    fur: '#e39045',
    ear: '#c46c2e',
  },
  {
    id: 'nube',
    name: 'Nube',
    coat: 'Blanco',
    age: '1 año',
    home: 'casa',
    mood: 'calma',
    line: 'Sale a oler las macetas y vuelve a sentarse en los pies de alguien.',
    story:
      'Le gusta la puerta abierta, pero no la aventura. El patio es una visita. La falda es la casa.',
    fur: '#f7f1e8',
    ear: '#e6d9cc',
  },
  {
    id: 'sombra',
    name: 'Sombra',
    coat: 'Negro',
    age: '7 meses',
    home: 'casa',
    mood: 'juego',
    line: 'Caza hojas, pierde, y pide upa como si hubiera ganado.',
    story:
      'Necesita un patio y alguien que le siga el juego. De noche se vuelve una sombra educada sobre el almohadón.',
    fur: '#2c2622',
    ear: '#1a1614',
  },
] as const satisfies readonly Kitten[]

export function chosenKitten(answers: Answers): Kitten {
  const mood = answers.energia ?? (answers.compania === 'travesura' ? 'juego' : 'calma')
  const home = answers.hogar ?? 'depto'
  return kittens.find((kitten) => kitten.mood === mood && kitten.home === home) ?? kittens[0]
}
