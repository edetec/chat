# Chat

Projeto de estudo das tecnologias 
## Dependencias
 - Svelte
 - FastAPI
 - Websocket

## Desenvolvimento

 1. Na raíz do projeto, crie o environment e instale as dependências
 ``` bash
    virtualenv venv
    source venv/bin/activate 
    pip install -r requirements.txt
 ```

 2. No diretório `client`, instale as dependências
 ```bash
    npm i
 ```

 3. Execute o server de desenvolvimento
 ```
    npm run dev
 ```

 4. Em um novo terminal, execute o servidor de desenvolvimento
 ```
    uvicorn server.main:app --reload
 ```