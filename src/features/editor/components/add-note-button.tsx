import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

export const AddNoteButton = memo(() => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => { }}
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  )
});

AddNoteButton.displayName = "AddNoteButton";