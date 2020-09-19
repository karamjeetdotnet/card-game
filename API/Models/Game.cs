using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Models
{
    public class Game
    {
        public Game(string fileId)
        {
            SourceCards = new List<int>();
            DestinationCards = new List<int>();
            MatchedCards = new List<int>();
            FileId = fileId;
        }
        public Game() { 
        }
        public string FileId { get; set; }
        public enum DifficultyType { 
            Easy, Medium, Hard
        }
        public DifficultyType Difficulty { get; set; }
        internal int[] CurrentCard { get; set; }
        public List<int> SourceCards { get; set; }
        public List<int> DestinationCards { get; set; }
        public List<int> MatchedCards { get; set; }
        /// <summary>
        /// Creating app start data
        /// </summary>
        public void CreateApp() {
            for (int i = 1; i < (NumberOfCards + 1); i++)
            {
                DestinationCards.Add(i);
                SourceCards.Add(i);
            };
            DestinationCards.Shuffle();
            SourceCards.Shuffle();

            SaveFile(this);
        }
        /// <summary>
        /// responsible for matching the cards and saving the data
        /// </summary>
        /// <returns></returns>
        public bool MatchApp()
        {
            if (CurrentCard.Length < 1) throw new Exception("Invalid format");//expecting two index data
            int desCardIndex = CurrentCard[0];//destination index
            int sourCardIndex = CurrentCard[1]; //source index
            if (desCardIndex < 0 || sourCardIndex < 0) throw new Exception("Invalid Data");//expecting valid indexes

            Game game = JsonSerializer.Deserialize<Game>(File.ReadAllText(FileName));
            
            bool matched = game.DestinationCards.ElementAt(desCardIndex) ==
                game.SourceCards.ElementAt(sourCardIndex);
            
            if (matched) {
                game.MatchedCards.Add(game.DestinationCards.ElementAt(desCardIndex));
                SaveFile(game);
            }
            
            return matched;
        }
        private void SaveFile(Game game) {
            if (!Directory.Exists(Config.RootFilePath)) { 
                Directory.CreateDirectory(Config.RootFilePath); 
            }
            File.WriteAllText(FileName, JsonSerializer.Serialize(game));
        }
        private string FileName { get {
                return Path.Combine(Config.RootFilePath,
FileId + ".json"); 
            } }
        private int NumberOfCards { get {
                switch (Difficulty) {
                    case DifficultyType.Easy:
                        return 5;
                    case DifficultyType.Medium:
                        return 10;
                    default:
                        return 25;
                }
            } 
        }
    }
}
