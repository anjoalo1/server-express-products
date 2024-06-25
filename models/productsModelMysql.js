// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:3307,
  password:'nemesis486',
  database: 'moviesdb',
});


export class ModelMysql{

    static async getAllProducts({genre}){

       if(genre) {
        const lowercaseGenre = genre.toLowerCase();
            try {
                const [genres] = await connection.query(
                'select BIN_TO_UUID(id), title, year from   movie M join movies_genre G on M.id = G.movie_id where G.genre_id=(select id from genre where lower(genre.name) = ?);', [lowercaseGenre]
                );
                
                /* console.log(fields); // fields contains extra meta data about results, if available
                console.log(results); */ // results contains rows returned by server
                if(genres.length===0){
                    return [];
                }else return genres
                //return genres;
        
            } catch (err) {
                console.log(err);
            }

       } else{


        try {
            const [results, fields] = await connection.query(
            'SELECT BIN_TO_UUID(id), title, year from movie;'
            );
            
            console.log(fields); // fields contains extra meta data about results, if available
            console.log(results); // results contains rows returned by server
            return results;
    
        } catch (err) {
            console.log(err);
        }

       }
        // A simple SELECT query
      
    }
}
