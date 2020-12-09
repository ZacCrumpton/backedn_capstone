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
    public class FollowedEventRepository
    {
        readonly string _connectionString;

        public FollowedEventRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }

        public IEnumerable<FollowedEvents> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from FollowedEvents";

            var followedEvents = db.Query<FollowedEvents>(sql);

            return followedEvents;
        }

        public FollowedEvents GetById(int followedEventsId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from FollowedEvents
                        where FollowedEventsId = @FollowedEventsId";
            var parameters = new { FollowedEventsId = followedEventsId };

            var singleFollowedEvent = db.QueryFirstOrDefault<FollowedEvents>(sql, parameters);
            return singleFollowedEvent;
        }

        public void AddFollowedEvent(FollowedEvents faToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[FollowedEvents]
                                ([EventId]
                                ,[UserId])
                            OUTPUT inserted.FollowedEventsId
                        VALUES 
                                (@EventId, @UserId)";

            var newId = db.ExecuteScalar<int>(sql, faToAdd);

            faToAdd.FollowedEventsId = newId;
        }

        public void Remove(int followedEventId)
        {
            var sql = @"DELETE
                        FROM [dbo].[FollowedEvents]
                        WHERE FollowedEventsId = @FollowedEventsId";
            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { FollowedEventsId = followedEventId });
        }

        public FollowedEvents Update(int followedEventsId, FollowedEvents followedEventToUpdate)
        {
            var sql = @"UPDATE [dbo].[FollowedEvents]
                            SET [EventId] = @EventId
                                ,[UserId] = @UserId
                            OUTPUT inserted.*
                            WHERE FollowedEventsId = @FollowedEventsId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                followedEventToUpdate.EventId,
                followedEventToUpdate.UserId,
                followedEventsId
            };

            var updatedFE = db.QueryFirstOrDefault<FollowedEvents>(sql, parameters);

            return updatedFE;
        }
    }
}
