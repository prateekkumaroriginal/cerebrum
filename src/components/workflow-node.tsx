"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  name?: string;
  description?: string;
  onDelete?: () => void;
  onSettings?: () => void;
}

export const WorkflowNode = ({
  children,
  showToolbar,
  name,
  description,
  onDelete,
  onSettings
}: WorkflowNodeProps) => {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button variant="ghost" size="sm">
            <SettingsIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">
            {name}
          </p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  )
}