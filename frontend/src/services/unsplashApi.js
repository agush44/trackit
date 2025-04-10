const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

/**
 * Busca imágenes en Unsplash
 * @param {string} query - Término de búsqueda
 * @param {number} page - Número de página (por defecto 1)
 * @param {number} perPage - Resultados por página (por defecto 10)
 * @returns {Promise<Array>} - Array de imágenes
 */
export const searchUnsplashImages = async (query, page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    throw error;
  }
};

/**
 * Obtiene imágenes aleatorias de Unsplash
 * @param {number} count - Número de imágenes a obtener (por defecto 10)
 * @returns {Promise<Array>} - Array de imágenes
 */
export const getRandomUnsplashImages = async (count = 10) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching random images from Unsplash:", error);
    throw error;
  }
};
