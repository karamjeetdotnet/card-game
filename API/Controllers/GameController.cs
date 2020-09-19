using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using static API.Models.Game;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class GameController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(string.Format("API is up and running!!! Date Time: {0}", DateTime.Now.ToString()));
        }
        [Route("start/{gameType}")]
        [HttpPost]
        public IActionResult Start(DifficultyType gameType) {
            string fileId = Guid.NewGuid().ToString();
            Game game = new Game(fileId);
            game.Difficulty = gameType;
            game.CreateApp();
            return Ok(game);
        }
        [Route("match/{fileId}")]
        [HttpPost]
        public IActionResult Match(string fileId, int[] values)
        {
            Game game = new Game(fileId);
            game.CurrentCard = values;
            return Ok(game.MatchApp());
        }
    }
}
