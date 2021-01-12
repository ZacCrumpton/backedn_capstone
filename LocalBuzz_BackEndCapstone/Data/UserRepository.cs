using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LocalBuzz_BackEndCapstone.Model;
using Microsoft.Extensions.Configuration;

namespace LocalBuzz_BackEndCapstone.Data
{
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }

        public IEnumerable<User> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from [User]";

            var users = db.Query<User>(sql);

            return users;
        }

        public User GetById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from [User]
                        where UserId = @UserId";
            var parameters = new { UserId = userId };

            var singleUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return singleUser;
        }

        public int GetIdByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from [User] where fbUid = @uid";

            var parameters = new { uid = uid };

            var selectedId = db.ExecuteScalar<int>(sql, parameters);

            return selectedId;
        }

        public void AddUser (User userToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[User]
                                ([UserName]
                                ,[Email]
                                ,[Password]
                                ,[City]
                                ,[State]
                                ,[isUser]
                                ,[DoB]
                                ,[UserPhoto])
                            Output inserted.UserId
                        VALUES
                                (@UserName,@Email,@Password,@City,@State,@isUser,@DoB,@UserPhoto)";

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.UserId = newId;
        }

        public void Remove(int userId)
        {
            var sql = @"DELETE
                        FROM [dbo].[User]
                        WHERE UserId = @UserId";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { UserId = userId });
        }

        public User Update(int userId, User userToUpdate)
        {
            var sql = @"UPDATE [dbo]. [User]
                            SET [UserName] = @UserName
                                ,[City] = @City
                                ,[State] = @State
                                ,[UserPhoto] = @UserPhoto
                            Output inserted.*
                            WHERE UserId = @UserId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                userToUpdate.UserName,
                userToUpdate.City,
                userToUpdate.State,
                userToUpdate.UserPhoto,
                userId
            };

            var updatedUser = db.QueryFirstOrDefault<User>(sql, parameters);

            return updatedUser;
        }
    }
}
