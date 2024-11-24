# Frontend

O frontend foi desenvolvido utilizando Next, com o intuito de consumir a API desenvolvida.

## Pré-requisitos
No arquivo `.env.development` na diretório do frontend, adicione a chave da API do Google Maps e a URL da API.

```env:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # Add your Google Maps API key here
```

## Rodando o projeto

- Instale as dependências do projeto com o comando `npm install`.
- Executar o comando `npm run dev` na raiz do diretório.

O projeto estará disponível em http://localhost:3001 ou outra porta disponível.