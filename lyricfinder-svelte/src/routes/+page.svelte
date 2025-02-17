<script lang="ts"> 
    import SearchBar from "$lib/SearchBar.svelte";
    import LyricsDisplay from "$lib/LyricsDisplay.svelte";

    let lyrics = ""; 
    let loading = false; 
    let recentSearches: { artist: string, song:string }[] = []; 

    async function fetchLyrics(artist:string, song: string) {
        if (!artist || !song) { 
            lyrics = "Invalid format. Please enter an artist and a song"; 
            return;
        }

        loading = true; 

        //Store in recent searches (limit to last 5 searches)
        recentSearches = [{artist, song}, ...recentSearches.slice(0,4)]

        const response = await fetch(`/api/lyrics?artist=${artist}&song=${song}`);
        const data = await response.json(); 
        lyrics = data.lyrics || "Lyrics not found."; 
        loading = false; 
    }
</script> 

<!-- 🛠️ UI -->
 <div class="max-w-lg mx-auto p-6 md:p-12 lg:p-16">
    <h1 class="text-2xl font-bold">LyricFinder</h1>
    <SearchBar onSearch={fetchLyrics} />
    {#if recentSearches.length > 0}
        <div class="mt-4">
            <h3 class="font-bold">Recent Searches</h3>
            <ul class="mt-2">
                {#each recentSearches as search, index}
                    <li>
                        <button 
                            class="text-blue-500 cursor-pointer hover:underline p-1 w-full text-left"
                            on:click={() => fetchLyrics(search.artist, search.song)}
                            on:keydown={(e) => {if (e.key === 'Enter') fetchLyrics(search.artist, search.song); }}
                        >                        
                            {search.artist} - {search.song}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}


    {#if loading}
        <p class="text-gray-500 animate-pulse mt-4">Loading...</p>
    {:else if lyrics}
        <LyricsDisplay lyrics={lyrics} />
    {/if}
</div>