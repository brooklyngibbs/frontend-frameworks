<script lang="ts">
    export let onSearch; 

    let artist = ""; 
    let song = ""; 

    function handleSubmit(event: Event) { 
        event.preventDefault(); //prevents page reload
        onSearch(artist, song); //calls parent function with values
    }
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-2 p-4 border rounded">
    <!-- Artist Input -->
     <input 
        type="text"
        placeholder="Artist Name"
        bind:value={artist}
        class="border p-2 w-full"
     />

     <!-- Song Input -->
     <input 
        type="text"
        placeholder="Song Title"
        bind:value={song}
        class="border p-2 w-full"
     />

     <!-- Submit Button -->
    <button type="submit" class="bg-amber-500 text-white p-2 rounded">
        Search
    </button>
</form>