using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using LocalBuzz_BackEndCapstone.Model;
using Dapper;

namespace LocalBuzz_BackEndCapstone.Data
{
    public class PostRepository
    {
        readonly string _connectionString;

        public PostRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }

        public IEnumerable<Post> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from Post";

            var posts = db.Query<Post>(sql);

            return posts;
        }

        public Post GetById(int postId)
        {
            using var db = new SqlConnection(_connectionString);


            var sql = @"select *
                        from Post
                        where PostId = @PostId";
            var parameters = new { PostId = postId };

            var singlePost = db.QueryFirstOrDefault<Post>(sql, parameters);
            return singlePost;
        }

        public void AddPost(Post postToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo]. [Post]
                                ([fbUid]
                                ,[ArtistId]
                                ,[PostText]
                                ,[dateCreated])
                            OUTPUT inserted.PostId
                        VALUES 
                                (@fbUid, @ArtistId, @PostText, @DateCreated)";

            var newId = db.ExecuteScalar<int>(sql, postToAdd);

            postToAdd.PostId = newId;
        }

        public void Remove(int postId)
        {
            var sql = @"DELETE
                        FROM [dbo].[Post]
                        WHERE PostId = @PostId;";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { PostId = postId });
        }

        public Post Update(int postId, Post postToUpdate)
        {
            var sql = @"UPDATE [dbo].[Post]
                            SET [ArtistId] = @ArtistId
                                ,[PostText] = @PostText
                                ,[DateCreated] = @DateCreated
                            OUTPUT inserted.*
                            WHERE PostId = @PostId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                postToUpdate.ArtistId,
                postToUpdate.PostText,
                postToUpdate.DateCreated,
                postId
            };

            var updatedPost = db.QueryFirstOrDefault<Post>(sql, parameters);

            return updatedPost;
        }
    }
}
