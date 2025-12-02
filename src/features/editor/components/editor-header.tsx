"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSuspenseWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface EditorHeaderProps {
  workflowId: string;
}

export const EditorSaveButton = ({ workflowId }: EditorHeaderProps) => {
  return (
    <div className="ml-auto">
      <Button size="sm" onClick={() => { }} disabled={false}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
}

export const EditorNameInput = ({ workflowId }: EditorHeaderProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateName = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) {
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === workflow.name || name.length < 2) {
      setIsEditing(false);
      return;
    }

    try {
      await updateName.mutateAsync({
        id: workflowId,
        name
      })
    } catch (error) {
      setName(workflow.name);
    } finally {
      setIsEditing(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow.name);
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <div className="flex relative">
        <Input
          disabled={updateName.isPending}
          ref={inputRef}
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="h-7 w-auto min-w-[100px] px-2"
        />
        {name.length < 2 && (
          <FieldError
            className="absolute -bottom-4 text-xs"
            errors={[{ message: "Name must be at least 2 characters!" }]}
          />
        )}
      </div>
    )
  }

  return (
    <BreadcrumbItem onClick={() => setIsEditing(true)}>
      <BreadcrumbPage>
        {workflow.name}
      </BreadcrumbPage>
    </BreadcrumbItem>
  )
}

export const EditorBreadCrumb = ({ workflowId }: EditorHeaderProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/workflows" prefetch>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const EditorHeader = ({ workflowId }: EditorHeaderProps) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex items-center justify-between gap-x-4 w-full">
        <EditorBreadCrumb workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
}

export default EditorHeader;