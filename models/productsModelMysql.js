// Get the client
import mysql from 'mysql2/promise';
import { productEschema, validateProduct, validatePartialProduct } from '../scheemes/productScheme.js';

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

    static async getProductById({id}){

        try{
            const sql = 'SELECT BIN_TO_UUID(id) AS id, title, year FROM movie WHERE id = UUID_TO_BIN(?);';
            const [rows, fields] = await connection.query(sql, [id]);
            //const [productid]=await connection.query('select BIN_TO_UUID(id), title, year from movie where id = UUID_TO_BIN(?);'=[id])
            if(rows.length===0) return [];
                else return rows
        }  catch (err) {
            console.log(err);
        }
    }

    static async updateProduct({id, input}){

        //const {title, year } = input;
        try{
            const sql = 'SELECT BIN_TO_UUID(id) AS id, title, year FROM movie WHERE id = UUID_TO_BIN(?);';
            const [rows, fields] = await connection.query(sql, [id]);
            //const [productid]=await connection.query('select BIN_TO_UUID(id), title, year from movie where id = UUID_TO_BIN(?);'=[id])
            if(rows.length===0) return false;
                else {
                   /*  const sql2 = 'UPDATE movie SET title = ? , year= ? WHERE id = UUID_TO_BIN(?);';
                    const[rows, fields] = await connection.query(sql2, [input.title, input.year, id]);
                    return rows; */


                    let sql = 'UPDATE movie SET ';
                    const params = [];
                    const fieldsToUpdate = [];
                
                    if (input.title !== undefined) {
                        fieldsToUpdate.push('title = ?');
                        params.push(input.title);
                    }
                
                    if (input.year !== undefined) {
                        fieldsToUpdate.push('year = ?');
                        params.push(input.year);
                    }
                
                    if (fieldsToUpdate.length === 0) {
                        throw new Error('Debe proporcionar al menos un campo para actualizar.');
                    }
                
                    sql += fieldsToUpdate.join(', ') + ' WHERE id = UUID_TO_BIN(?);';
                    params.push(id);
                
                    const [rows, fields] = await connection.query(sql, params);
                    return rows;

                }
        }  catch (err) {
            console.log(err);
        }

    }
}
