# Usando a imagem oficial do MongoDB
FROM mongo:7.0

# Diretório onde os scripts de inicialização podem ser copiados
# Qualquer script .js ou .sh colocado em /docker-entrypoint-initdb.d será executado
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expondo a porta padrão do MongoDB
EXPOSE 27017
