
export enum Configuration {
  SERVER_HOST = 'SERVER_HOST', // Ubicación de nuestro backend
  SERVER_PORT = 'SERVER_PORT', // Puesto que usa nuestro backend
  DB_TYPE = 'DB_TYPE', // Tipo de conexión de base de datos
  DB_HOST = 'DB_HOST', // Ubicación de la bbdd
  DB_PORT = 'DB_PORT', // Puerto para conectar a la bbdd
  DB_USER = 'DB_USER', // Usuario para conectar con la bbdd
  DB_PASSWORD = 'DB_PASSWORD', // Contraseña del usuario de bbdd
  DB_NAME = 'DB_NAME', // Nombre de la base de datos a la se conectara nuestro backend
  JWT_SECRET = 'JWT_SECRET' // Secret utilizado para la comunicación por JWT
}