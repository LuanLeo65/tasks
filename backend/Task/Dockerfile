FROM node:18

WORKDIR /app

# 1. Copiar package.json
COPY package*.json ./

# 2. Copiar a commons pro container
COPY ../__commons__ ./__commons__

# 3. Instalar dependências
RUN npm install

# 4. Copiar o código da API
COPY . .

# 5. Gerar build
RUN npm run build

# 6. Expor porta da API
EXPOSE 3000  

CMD ["npm", "run", "dev"]
