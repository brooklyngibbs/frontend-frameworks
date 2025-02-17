// Import React's useState hook to manage component state
import { useState } from 'react';

export default function SearchBar({ onSearch }) { 
    // useState creates a state variable 'query' with an initial value of "" (empty string)
    // setQuery is the function used to update 'query'
    // This makes 'query' a controlled input (React will manage its value)
    const [artist, setArtist] = useState(""); 
    const [song, setSong] = useState(""); 

    // This function runs when the user submits the search form
    const handleSubmit = (e) => { 
        e.preventDefault(); // Prevents the browser from refreshing the page on form submit
        onSearch(artist, song); // Calls the 'onSearch' function, passing in the current query value
    }

    return (
        // A form that lets the user enter a song name and artist
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded">
            {/* Input field where the user types in the artist and song */}
            <input
                type="text"
                placeholder="Artist Name"
                value={artist} // Controlled input: value comes from React state
                onChange={(e) => setArtist(e.target.value)} // Updates 'query' state when user types
                className="border p-2 w-full"
            />
            <input
                type="text"
                placeholder="Song Title"
                value={song} // Controlled input: value comes from React state
                onChange={(e) => setSong(e.target.value)} // Updates 'query' state when user types
                className="border p-2 w-full"
            />
            {/* Submit button */}
            <button type="submit" className="bg-amber-500 text-white p-2 rounded">
                Search
            </button>
        </form>
    );
}