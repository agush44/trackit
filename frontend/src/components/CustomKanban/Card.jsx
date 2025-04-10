import { useState } from "react";
import { motion } from "framer-motion";
import { DropIndicator } from "./DropIndicator";
import { CardModal } from "./CardModal";
import { updateTask } from "../../services/taskApi";

export const Card = ({
  title,
  id,
  column,
  handleDragStart,
  description,
  coverImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDescription, setCardDescription] = useState(description);
  const [cardCoverImage, setCardCoverImage] = useState(coverImage);

  const handleCardClick = (e) => {
    if (!e.currentTarget.dragging) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCard = async (updatedCard) => {
    console.log("🟨 Enviando datos al backend:", {
      title: updatedCard.title,
      description: updatedCard.description,
      coverImage: updatedCard.coverImage,
      column,
    });

    try {
      await updateTask(id, {
        title: updatedCard.title,
        description: updatedCard.description,
        coverImage: updatedCard.coverImage,
        column,
      });

      setCardTitle(updatedCard.title);
      setCardDescription(updatedCard.description);
      setCardCoverImage(updatedCard.coverImage);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating card:", err);
    }
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => {
          e.currentTarget.dragging = true;
          handleDragStart(e, {
            title: cardTitle,
            id,
            column,
            description: cardDescription,
            coverImage: cardCoverImage,
          });
          setTimeout(() => {
            e.currentTarget.dragging = false;
          }, 100);
        }}
        onClick={handleCardClick}
        whileHover={{
          backgroundColor: "rgb(60, 64, 67)",
          transition: { duration: 0.01 },
        }}
        style={{ backgroundColor: "#202124" }}
        className="rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing hover:border-purple-500 transition-colors"
      >
        {cardCoverImage && (
          <div className="mb-2 rounded overflow-hidden h-24 bg-neutral-700">
            <img
              src={cardCoverImage || "/placeholder.svg"}
              alt={cardTitle}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-sm text-neutral-100 font-medium">{cardTitle}</p>
        {cardDescription && (
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
            {cardDescription}
          </p>
        )}
      </motion.div>

      {isModalOpen && (
        <CardModal
          card={{
            title: cardTitle,
            id,
            column,
            description: cardDescription,
            coverImage: cardCoverImage,
          }}
          onClose={handleCloseModal}
          onSave={handleSaveCard}
        />
      )}
    </>
  );
};
