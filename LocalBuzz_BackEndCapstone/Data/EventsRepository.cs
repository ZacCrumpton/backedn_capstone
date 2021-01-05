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
    public class EventsRepository
    {
        readonly string _connectionString;

        public EventsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("LocalBuzz");
        }

        public IEnumerable<Events> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from Events";

            var events = db.Query<Events>(sql);

            return events;
        }

        public Events GetById(int eventId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Events
                        where EventID = @EventId";
            var parameters = new { EventId = eventId };

            var singleEvent = db.QueryFirstOrDefault<Events>(sql, parameters);
            return singleEvent;
        }

        public void AddEvent(Events eventToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Events]
                                ([fbUid]
                                ,[ArtistId]
                                ,[City]
                                ,[State]
                                ,[Date]
                                ,[Address]
                                ,[TicketPrice])
                            OUTPUT inserted.EventId
                        VALUES
                                (@fbUid, @ArtistId, @City, @State, @Date, @Address, @TicketPrice)";

            var newId = db.ExecuteScalar<int>(sql, eventToAdd);

            eventToAdd.EventId = newId;
        }

        public void Remove(int eventId)
        {
            var sql = @"DELETE
                        FROM [dbo].[Events]
                        WHERE EventId = @EventId";
            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { EventId = eventId });
        }

        public Events Update(int eventId, Events eventToUpdate)
        {
            var sql = @"UPDATE [dbo].[Events]
                            SET [City] = @City
                                ,[State] = @State
                                ,[Date] = @Date
                                ,[Address] = @Address
                                ,[TicketPrice] = @TicketPrice
                            OUTPUT inserted.*
                            WHERE EventId = @EventId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                eventToUpdate.City,
                eventToUpdate.State,
                eventToUpdate.Date,
                eventToUpdate.Address,
                eventToUpdate.TicketPrice,
                EventId = eventId
            };

            var updatedUser = db.QueryFirstOrDefault<Events>(sql, parameters);

            return updatedUser;
        }
    }
}
