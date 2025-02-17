export async function fetchLyrics(artist, song) { 
    try { 
        // Fetches lyrics using fetch() (an async request).
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        if (!response.ok) throw new Error("Lyrics not found"); 
        
        const data = await response.json(); 
        return data.lyrics || "Lyrics not found"; 
    } catch (error) { 
        return "Error fetching lyrics."
    }
}