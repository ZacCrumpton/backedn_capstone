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
    public class FollowedArtistRepository
    {
        readonly string _connectionString;

        public FollowedArtistRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }

        public IEnumerable<FollowedArtist> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from FollowedArtist";

            var fArtists = db.Query<FollowedArtist>(sql);

            return fArtists;
        }

        public FollowedArtist GetById(int followedArtistId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from FollowedArtist
                        where FollowedArtistId = @FollowedArtistId";
            var parameters = new { FollowedArtistId = followedArtistId };

            var singleFA = db.QueryFirstOrDefault<FollowedArtist>(sql, parameters);
            return singleFA;
        }

        public void AddFollowedArtist(FollowedArtist followedArtistToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[FollowedArtist]
                                ([BeingFollowedId]
                                ,[FollowerId])
                            OUTPUT inserted.FollowedArtistId
                        VALUES
                                (@BeingFollowedId, @FollowerId)";

            var newId = db.ExecuteScalar<int>(sql, followedArtistToAdd);

            followedArtistToAdd.FollowedArtistId = newId;
        }

        public void Remove(int followedArtistId)
        {
            var sql = @"DELETE
                        FROM [dbo].[FollowedArtist]
                        WHERE FollowedArtistId = @FollowedArtistId";
            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { FollowedArtistId = followedArtistId });
        }

        public FollowedArtist Update(int followedArtistId, FollowedArtist faToUpdate)
        {
            var sql = @"UPDATE [dbo].[FollowedArtist]
                            SET [BeingFollowedId] = @BeingFollowed
                                ,[FollowerId] = @Follower
                            OUTPUT inserted.*
                            WHERE FollowedArtistId = @FollowedArtistId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                faToUpdate.BeingFollowedId,
                faToUpdate.FollowerId,
                followedArtistId
            };

            var updatedFA = db.QueryFirstOrDefault<FollowedArtist>(sql, parameters);

            return updatedFA;
        }
    }
}
