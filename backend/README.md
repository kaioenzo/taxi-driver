# Backend

O backend foi desenvolvido utilizando Nest, com MongoDB, com o intuito de fornecer uma API para o frontend.

## Pré-requisitos
No arquivo `.env` na raíz do projeto, adicione a chave da API do Google Maps.
 
Tenha o node 22 instalado.


## Rodando o projeto

- Suba o container do MongoDB com o comando `docker compose -f docker-compose-dev.yml up` na **raíz do projeto**.
- Instale as dependências do projeto com o comando `npm install`.
- Executar o comando `npm run start:dev` na raiz do diretório.

O projeto estará disponível em http://localhost:3000 ou outra porta disponível.
Um console do mongo-express estará disponível em http://localhost:8081.

O schema de drivers é criado automaticamente ao rodar o projeto, por um script.