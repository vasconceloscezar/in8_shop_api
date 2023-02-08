export default {
  // mongoURI: process.env.MONGO_URI ?? 'mongodb://host.docker.internal:27017',
  mongoURI: process.env.MONGO_URI ?? 'mongodb+srv://czrvsc:XZMf92IvD4Domzd9@in8-db.d4qh0gb.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H',
  providersURL: {
    brazilian: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/',
    european: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/'
  }
}
