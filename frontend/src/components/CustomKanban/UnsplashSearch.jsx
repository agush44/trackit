import { useEffect, useState } from "react";
import { Search, Loader, X } from "lucide-react";
import {
  searchUnsplashImages,
  getRandomUnsplashImages,
} from "../../services/unsplashApi";

export const UnsplashSearch = ({ onSelectImage, onCancel }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRandomImages = async () => {
      setLoading(true);
      try {
        const results = await getRandomUnsplashImages(9);
        setImages(results.map((img) => img.urls.small));
      } catch (err) {
        setError("No se pudieron cargar las imágenes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomImages();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await searchUnsplashImages(query, 1, 12);
      setImages(results.map((img) => img.urls.small));
    } catch (err) {
      setError("Error buscando imágenes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-neutral-300">
          Buscar imagen de portada
        </h4>
        <button
          onClick={onCancel}
          className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-3 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en Unsplash..."
            className="w-full p-2 pl-8 bg-neutral-700 border border-neutral-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
          <Search
            size={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded transition-colors"
          disabled={loading}
        >
          {loading ? <Loader size={16} className="animate-spin" /> : "Buscar"}
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={24} className="animate-spin text-neutral-400" />
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-1">
          {images.map((url, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(url)}
              className="aspect-square overflow-hidden rounded hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              <img
                src={url || "/placeholder.svg"}
                alt={`Unsplash image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-neutral-500 mt-3">
        Imágenes provistas por Unsplash.
      </p>
    </div>
  );
};
