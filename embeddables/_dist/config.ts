import { schema as form_00000000_0000_4000_8000_000000000001 } from './forms/00000000-0000-4000-8000-000000000001/schema.ts';

const config = {
  "projectId": "78bf574f-57a9-4279-be2f-670c45efb42c",
  "forms": {
    "00000000-0000-4000-8000-000000000001": form_00000000_0000_4000_8000_000000000001
  },
  "experiments": [],
  "protocols": [],
  "enabledModules": {
    "analytics": true,
    "experiments": false,
    "forms": true,
    "protocols": false
  },
  "pages": [
    {
      "id": "bienvenida",
      "path": "/",
      "title": "Bienvenida"
    },
    {
      "id": "energia",
      "path": "/quiz/energia",
      "title": "Energía"
    },
    {
      "id": "hogar",
      "path": "/quiz/hogar",
      "title": "Hogar"
    },
    {
      "id": "compania",
      "path": "/quiz/compania",
      "title": "Compañía"
    },
    {
      "id": "match",
      "path": "/match",
      "title": "Tu gatito"
    },
    {
      "id": "reserva",
      "path": "/reserva",
      "title": "Reserva"
    },
    {
      "id": "gracias",
      "path": "/gracias",
      "title": "Gracias"
    }
  ]
} as const;

export { config };
export default config;
