// init-scripts/init-users.js

db = db.getSiblingDB("NetProactiveAXDB"); // Banco definido no .env

// Criação da collection "users"
db.createCollection("users");

// Inserção de 10 registros
db.users.insertMany([
  { nome: "João Silva", cpf: "123.456.789-00" },
  { nome: "Maria Oliveira", cpf: "234.567.890-11" },
  { nome: "Pedro Santos", cpf: "345.678.901-22" },
  { nome: "Ana Costa", cpf: "456.789.012-33" },
  { nome: "Lucas Pereira", cpf: "567.890.123-44" },
  { nome: "Beatriz Almeida", cpf: "678.901.234-55" },
  { nome: "Rafael Souza", cpf: "789.012.345-66" },
  { nome: "Carla Fernandes", cpf: "890.123.456-77" },
  { nome: "Bruno Rocha", cpf: "901.234.567-88" },
  { nome: "Larissa Martins", cpf: "012.345.678-99" }
]);

print("Collection 'users' criada com 10 registros.");
