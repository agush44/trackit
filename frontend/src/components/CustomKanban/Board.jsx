import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";
import { DEFAULT_CARDS } from "./defaultCards";
import { useState } from "react";

export const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full gap-3 p-12 flex items-start justify-center">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
