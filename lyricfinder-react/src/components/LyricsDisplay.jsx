// This component receives "lyrics" as a prop from the parent component (App.jsx)
export default function LyricsDisplay({ lyrics }) { 
    return (
        // A styled container that wraps the lyrics 
        <div className="p-4 mt-4 border rounded">
            {/* A heading for the lyrics section */}
            <h2 className="text-lg font-bold">Lyrics</h2>

            {/* 🔹 Display the lyrics if they exist, otherwise show "No lyrics found." */}
             {/* 🔹 "whitespace-pre-wrap" makes sure the lyrics format correctly */}
             <p className="whitespace-pre-wrap">{lyrics || "No lyrics found."}</p>
        </div>
    ); 
}