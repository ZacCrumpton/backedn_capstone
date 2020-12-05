using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using LocalBuzz_BackEndCapstone.Model;
using Dapper;

namespace LocalBuzz_BackEndCapstone.Data
{ 
    public class ArtistRepository
    {
        readonly string _connectionString;

        public ArtistRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }
        public IEnumerable<Artist> GetALL()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from Artist";

            var users = db.Query<Artist>(sql);

            return users;
        }

        public Artist GetById(int artistId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Artist
                        where ArtistId = @ArtistId";

            var parameters = new { ArtistId = artistId };

            var singleArtist = db.QueryFirstOrDefault<Artist>(sql, parameters);
            return singleArtist;
        }

        public void AddArtist(Artist artistToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Artist]
                                ([ArtistName]
                                ,[ArtistEmail]
                                ,[ArtistPassword]
                                ,[City]
                                ,[State]
                                ,[Genre]
                                ,[Followers]
                                ,[isArtist]
                                ,[ArtistPhoto])
                            Output inserted.ArtistId
                        VALUES
                                (@ArtistName, @ArtistEmail, @ArtistPassword, @City, @State, @Genre, @Followers, @isArtist, @ArtistPhoto)";

            var newId = db.ExecuteScalar<int>(sql, artistToAdd);

            artistToAdd.ArtistId = newId;
        }

        public void Remove(int artistId)
        {
            var sql = @"DELETE
                        FROM [dbo].[Artist]
                        WHERE ArtistId = @ArtistId";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { ArtistId = artistId });
        }

        public Artist Update(int id, Artist artistToUpdate)
        {
            var sql = @"UPDATE [dbo].[Artist]
                            SET [ArtistName] = @aname
                                ,[ArtistEmail] = @aemail
                                ,[ArtistPassword] = @apassword
                                ,[City] = @city
                                ,[State] = @state
                                ,[Genre] = @genre
                                ,[Followers] = @followers
                                ,[ArtistPhoto] = @aphoto
                            OUTPUT inserted.*
                            WHERE id = @aid";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                artistToUpdate.ArtistName,
                artistToUpdate.ArtistEmail,
                artistToUpdate.ArtistPassword,
                artistToUpdate.City,
                artistToUpdate.State,
                artistToUpdate.Genre,
                artistToUpdate.Followers,
                artistToUpdate.ArtistPhoto,
                id
            };

            var updatedArtist = db.QueryFirstOrDefault<Artist>(sql, parameters);

            return updatedArtist;
 
        }
    }
}
