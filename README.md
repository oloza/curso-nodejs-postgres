========
Configuracion de Postgre en Docker
========
to download and install postgresql
    enter to your project and set docker-compose.yml
    docker-compose up -d postgres

view services
    docker-compose ps
stop services
    docker-compose down

concepto clave de contenedor que son
 "stateless" que no tiene estado permite distribucion en forma horizontal cluseterizar servicios

 la  base de datos necesita un estado porque persiste datos
 si apagas el contenedor se borra todo lo que hacia y no guarda ese estado                                        

para guardar los datos usar volumenes en el *.yml

volumes:
      - ./postgres_data:/var/lib/postgresql/data

========
Explorando Postgres: interfaces gráficas vs. terminal
========
terminal:
   docker-compose exec postgres bash
   root@9e1c0807cbb1:/# psql -h localhost -d my_store -U nico
cómo saber que estas en la Bdd
my_store=# \d+

GUI:
    en el docker-compose.yml poner otro servicio
pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80
    
 levantar pgadmin 
    docker-compose up -d pgadmin

 acceder a pgadmin
     http://localhost:5050
     
     admin@mail.com
     root

[TAB general]
Name:MyStore
[TAB connection]
hostName:
    para saber la IP de la Base puedes ver e
    docker ps  #para ver el container_id
    docker inspect 9e1c0807cbb1
port:5432
Manteinance Database: my_store   # this name is from libs/postgres.js
userName:nico
savePwd:yes


========
Integración de node-postgres
========
capa libs conexion a terceros apis o Bdd
    const {Client} = require('pg');
    async function getConnection() {
    const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store'
    });
    await client.connect();
    return client; 
    }
============
Manejando un Pool de conexiones
============
la conexión no es la mas adecuada,
llamando a getConection cada vez que pidamos a getConection estamos pidiendo conexiones y no es la mas adecuada

pg nose da un motor de inyection con node

la primera conexion hace un await interno y comprate la conexión, no se necesita un async

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'nico',
  password: 'admin123',
  database: 'my_store'
});

in the service
..
await this.pool.query(query);

=========
variables de entorno
=========
crear una carpeta llamada config
crear un archivo config.js
proteger con encodeURIComponent
si tienes base de datos remotas es normal que te den una URI de conexion
    postgres://nico:admin123@localhost:5432/my_store

en desarrollo se puede definir las variables de entrono en el package.json en scripts-> "start":"NODE_ENV=dev PORT=3000 node index.js"

para no definrlo así se usa archivos de entorno  -> .env

el .env no debe ser leido por el repositorio

se necesita un paquete para leer los archivos de entorno
npm install dotenv
y en el index.js
require('dotenv').config();

===========
¿Qué es un ORM? Instalación y configuración de Sequelize ORM
===========

mapear toda la base de datso en objetos
lo abstrae, es agnostico 
dos ORMS
Sequelize
typeORM  se recomienda más en entornos con typeScript

Sequelize va gestionar la conexión

instalar
npm install --save sequelize
npm install --save pg-hstore  para serializar los objetos

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false, // para mostrar los logs
  }); 

const[data,metadata]= await sequelize.query(query);

=========
Tu primer modelo en Sequelize
========
crear entiddes o modelos
se trabaja con esquemas
normalmente en las base de datos el nombre de la tabla es en plural
el esquema define la estructura de la base de datos
el naming en la base de datos no puede ser camel Case, debe ser seguido de una "_" por buenas practicas

 cuando extienden de Model(tienen find, findAll) la forma de hacer queries
 se crean metodos staticos

