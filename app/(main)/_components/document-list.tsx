"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId],
        }));
    };

    // Fetch documents from API
    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId,
    });

    // Handle loading state
    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
            </>
        );
    }

    // Handle empty documents case
    if (documents.length === 0) {
        return <p className="text-sm text-muted-foreground">No documents found.</p>;
    }

    return (
        <div>
            {documents.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={() => onRedirect(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]}
                    />
                    {expanded[document._id] && (
                        <DocumentList
                            parentDocumentId={document._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

// Redirect function
const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
};