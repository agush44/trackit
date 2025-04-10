import { useState, useEffect, useRef } from "react";
import { X, ImageIcon, Trash2 } from "lucide-react";
import { UnsplashSearch } from "./UnsplashSearch";
import Button from "../UI/Button";

export const CardModal = ({ card, onClose, onSave }) => {
  const [title, setTitle] = useState(card.title || "");
  const [description, setDescription] = useState(card.description || "");
  const [coverImage, setCoverImage] = useState(card.coverImage || "");
  const [showUnsplashSearch, setShowUnsplashSearch] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSave = () => {
    if (!title.trim()) return;

    setIsSaving(true);

    setTimeout(() => {
      onSave({
        ...card,
        title,
        description: description || "",
        coverImage: coverImage || "",
      });
      setIsSaving(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelectImage = (imageUrl) => {
    setCoverImage(imageUrl);
    setShowUnsplashSearch(false);
  };

  const handleRemoveCover = () => {
    setCoverImage("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-neutral-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <h3 className="text-lg font-medium text-white">Editar tarjeta</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {coverImage && (
          <div className="relative h-48 bg-neutral-700">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemoveCover}
              className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <Trash2 size={20} className="text-white m-1.5" />
            </button>
          </div>
        )}

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Título
            </label>
            <input
              ref={titleInputRef}
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="Título de la tarjeta"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 min-h-[100px] resize-none"
              placeholder="Añade una descripción más detallada..."
            />
          </div>

          {showUnsplashSearch ? (
            <UnsplashSearch
              onSelectImage={handleSelectImage}
              onCancel={() => setShowUnsplashSearch(false)}
            />
          ) : (
            <button
              onClick={() => setShowUnsplashSearch(true)}
              className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
            >
              <ImageIcon size={16} />
              <span>{coverImage ? "Cambiar portada" : "Añadir portada"}</span>
            </button>
          )}
        </div>

        <div className="p-4 border-t border-neutral-700 flex justify-end gap-2">
          <Button onClick={onClose}>Cancelar</Button>

          <Button
            onClick={handleSave}
            isLoading={isSaving}
            disabled={!title.trim()}
            className="bg-indigo-500"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};
