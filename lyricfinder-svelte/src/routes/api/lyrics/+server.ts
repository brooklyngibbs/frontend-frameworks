import { json } from '@sveltejs/kit'

const cache = new Map(); 

export async function GET({ url }) { 
    const artist = url.searchParams.get("artist")?.toLowerCase(); 
    const song = url.searchParams.get("song")?.toLowerCase();

    if(!artist || !song) { 
        return json({error: "Missing artist or song"}, {status: 400}); 
    }

    const key = `${artist}-${song}`

    //check if the lyrics are already in the cache 
    if (cache.has(key)) { 
        console.log(`✅ Serving from cache: ${key}`); 
        return json({lyrics: cache.get(key)}); 
    }

    try {
        console.log(`🌐 Fetching lyrics for: ${artist} - ${song}`);
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`); 
        const data = await response.json(); 
        const lyrics = data.lyrics || "Lyrics not found.";

        cache.set(key, lyrics); //Stores lyrics in the cache 

        return json({lyrics}); 
    } catch (error) { 
        return json({error: "Failed to fetch lyrics."}, {status: 500}); 
    }
}