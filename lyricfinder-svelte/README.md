# 🎵 LyricFinder: The SvelteKit Edition

> Same app, different approach! After building LyricFinder in React, I wanted to see how SvelteKit would handle the same challenges. The differences are fascinating!

## 🤔 Why SvelteKit?

Remember how in React, we had to:
- Manually manage state with useState
- Write verbose event handlers
- Set up routing explicitly
- Create a separate backend for API routes

SvelteKit takes a different approach:
- State management is built-in and reactive
- Event handling is concise (`on:click` instead of `onClick={handleClick}`)
- File-based routing comes out of the box
- API routes are just `+server.ts` files in your project

## 🚀 Getting Started

```bash
# Create a new SvelteKit project
npx create svelte@latest lyricfinder-svelte

# Navigate to the project
cd lyricfinder-svelte

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 SvelteKit's Magic File System

The real power of SvelteKit lies in its file-based routing and server-side capabilities. Here's how it's structured:

```bash
src/
├── routes/
│   ├── +page.svelte         # Homepage UI
│   ├── +page.ts            # Client-side data loading
│   ├── +page.server.ts     # Server-side data loading
│   ├── +layout.svelte      # Shared layout UI
│   ├── +layout.ts          # Shared client data loading
│   ├── +layout.server.ts   # Shared server data loading
│   ├── +server.ts          # API endpoint
│   └── api/
│       └── lyrics/
│           └── +server.ts   # Lyrics API endpoint
└── lib/
    ├── components/
    │   ├── SearchBar.svelte
    │   └── LyricsDisplay.svelte
    └── utils/
        └── cache.ts
```

### Special Files and Their Purpose

#### 1. Page Files

```svelte
// +page.svelte - The UI Component
<script lang="ts">
    export let data;  // Gets data from +page.ts or +page.server.ts
</script>

<h1>{data.title}</h1>
```

```typescript
// +page.server.ts - Server-Only Data Loading
export const load = async () => {
    // Only runs on server - safe for API keys, DB queries
    const data = await fetch('https://api.lyrics.ovh/v1/...');
    return { lyrics: data };
};
```

#### 2. API Routes

```typescript
// routes/api/lyrics/+server.ts
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    const artist = url.searchParams.get('artist');
    const song = url.searchParams.get('song');
    
    // Fetch lyrics logic here
    
    return json({ lyrics });
};
```

## 🔍 Key Components

### SearchBar Component
```svelte
<script lang="ts">
  export let onSearch: (artist: string, song: string) => void;
  
  let artist = "";
  let song = "";
  
  function handleSubmit() {
    onSearch(artist, song);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={artist} placeholder="Artist Name"/>
  <input bind:value={song} placeholder="Song Title"/>
  <button type="submit">Search</button>
</form>
```

### LyricsDisplay Component
```svelte
<script lang="ts">
  export let lyrics: string;
</script>

<div class="lyrics-container">
  <h2>Lyrics</h2>
  <p class="whitespace-pre-wrap">{lyrics || "No lyrics found."}</p>
</div>
```

## 🔄 Key Differences from React

### 1. State Management
```typescript
// React Version
const [query, setQuery] = useState("");
const handleChange = (e) => setQuery(e.target.value);

// SvelteKit Version
let query = "";  // That's it! It's reactive by default
```

### 2. Event Handling
```typescript
// React Version
<input 
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>

// SvelteKit Version
<input bind:value={query} />
```

### 3. API Routes
```typescript
// React Version (Next.js or separate backend needed)
// pages/api/lyrics.ts
export default async function handler(req, res) {
  // API logic here
}

// SvelteKit Version
// routes/api/lyrics/+server.ts
export const GET = async ({ url }) => {
  // API logic here
  return json({ lyrics });
}
```

## 🛠️ Implementation Details

### Main Page Setup
```svelte
<!-- routes/+page.svelte -->
<script lang="ts">
    import SearchBar from '$lib/components/SearchBar.svelte';
    import LyricsDisplay from '$lib/components/LyricsDisplay.svelte';
    export let data;
</script>

<div class="max-w-lg mx-auto p-6">
    <h1 class="text-2xl font-bold">LyricFinder</h1>
    <SearchBar />
    {#if data.lyrics}
        <LyricsDisplay lyrics={data.lyrics} />
    {/if}
</div>
```

### API Implementation
```typescript
// routes/api/lyrics/+server.ts
import { json } from '@sveltejs/kit';

const cache = new Map();

export const GET = async ({ url }) => {
    const artist = url.searchParams.get('artist')?.toLowerCase();
    const song = url.searchParams.get('song')?.toLowerCase();

    if (!artist || !song) {
        return json({ error: "Missing artist or song" }, { status: 400 });
    }

    const key = `${artist}-${song}`;

    // Check cache first
    if (cache.has(key)) {
        return json({ lyrics: cache.get(key) });
    }

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        const data = await response.json();
        const lyrics = data.lyrics || "Lyrics not found.";

        cache.set(key, lyrics);
        return json({ lyrics });
    } catch (error) {
        return json({ error: "Failed to fetch lyrics" }, { status: 500 });
    }
};
```

## 🏃‍♂️ Performance Comparison

1. **Bundle Size**
   - React: ~143KB (including React DOM)
   - SvelteKit: ~24KB (Svelte runtime)

2. **Initial Load Time**
   - React: Multiple JavaScript chunks
   - SvelteKit: Single bundle, faster parse time

3. **Runtime Performance**
   - React: Virtual DOM diffing
   - SvelteKit: Direct DOM updates

## 🎓 Learning Curve Notes

1. **React Developers Will Notice:**
   - No need for useEffect
   - No useState boilerplate
   - More intuitive event handling
   - Built-in transitions
   
2. **Takes Getting Used To:**
   - `$:` reactive declarations
   - The `export let` syntax for props
   - File-based routing conventions
   - Server vs. client load functions

## 🔮 Next Steps

1. **Clone and Run:**
   ```bash
   git clone https://github.com/brooklyngibbs/frontend-frameworks.git
   cd lyricfinder-sveltekit
   npm install
   npm run dev
   ```

2. **Explore Features:**
   - Server-side rendering
   - Built-in API routes
   - Form actions
   - Caching implementation

3. **Try Adding:**
   - Authentication
   - Database integration
   - More complex caching
   - Error boundaries

## 📚 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [SvelteKit GitHub](https://github.com/sveltejs/kit)
---

Built with 💚 by Brooklyn Gibbs while exploring modern frontend frameworks. Check out my other framework implementations:
- [React Version](https://github.com/brooklyngibbs/frontend-frameworks/tree/main/lyricfinder-react)
- [Qwik Version](link-to-repo) (Coming Soon)
- [Astro Version](link-to-repo) (Coming Soon)