========
Configuracion de Postgre en Docker
========
to download and install postgresql
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

para saber la IP de la Base puedes ver e
docker ps  #para ver el container_id
docker inspect 9e1c0807cbb1

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

