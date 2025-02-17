import { useState } from 'react'
import SearchBar from './components/SearchBar'
import LyricsDisplay from './components/LyricsDisplay'
import { fetchLyrics } from './api'

function App() {
  const [lyrics, setLyrics] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [cache, setCache] = useState({}); 
  const [recentSearches, setRecentSearches] = useState([]); 

  const handleSearch = async (artist, song) => {

    console.log("🔍 Searching for:", artist, song);
    setLoading(true);

    if (!artist || !song) {
      console.log("❌ Invalid input");
      setLyrics("Invalid format.");
      setLoading(false);
      return;
    }

    // Store recent searches as objects instead of a string
    setRecentSearches((prev) => [{ artist, song }, ...prev.slice(0, 4)]); 

    const key = `${artist.toLowerCase()}-${song.toLowerCase()}`;
    console.log("🗝 Cache Key:", key);
  
    if (cache[key]) { 
      console.log("✅ Found in cache!");
      setLyrics(cache[key]); 
      setLoading(false); 
      return; 
    }
  
    try {
      console.log("🌎 Fetching from API...");
      const lyricsResult = await fetchLyrics(artist.trim(), song.trim());
      console.log("🎵 Lyrics received:", lyricsResult);

      setLyrics(lyricsResult);
      setCache((prevCache) => ({ ...prevCache, [key]: lyricsResult }));
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      setLyrics("Error fetching lyrics. Please try again.");
    }
  
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 md:p-12 lg:p-16">
      <h1 className="text-2xl font-bold">LyricFinder</h1>
      <SearchBar onSearch={handleSearch}/>
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading...</p>
      ) : lyrics? (
        <LyricsDisplay lyrics={lyrics} />
      ) : (
        <p className="text-red-500"> No lyrics found.</p>
      )}
      {recentSearches.length > 0 && ( 
        <div className="mt-4">
          <h3 className="font-bold">Recent Searches</h3>
          <ul>
            {recentSearches.map((search, index) => ( 
              <li 
                key={index} 
                className="text-blue-500 cursor-pointer" 
                onClick={() => handleSearch(search.artist, search.song)}
              >
                {search.artist} - {search.song}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App;