<script lang="ts">
    export let lyrics: string = ""; 
</script>

<div class="p-4 mt-4 border rounded">
    <h2 class="text-lg font-bold">Lyrics</h2>
    <p class="whitespace-pre-wrap">{lyrics || "No Lyrics Found."}</p>
</div>