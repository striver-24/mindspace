"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search } from "lucide-react";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const[search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note Restored",
            error:" Failed to Restore Node"
        });
    };

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note Deleted",
            error:" Failed to delete Node"
        });

        if ( params.documentId === documentId ) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        );
    }


    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search />
            </div>
        </div>
    )
}