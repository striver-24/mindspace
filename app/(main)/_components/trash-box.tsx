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

    const [search, setSearch] = useState("");

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
            error: "Failed to Restore Note"
        });
    };

    const onRemove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note Deleted",
            error: "Failed to delete Note"
        });

        if (params.documentId === documentId) {
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
                <input
                    type="text"
                    placeholder="Search documents..."
                    value={search}
                    onChange={(e ) => setSearch(e.target.value)}
                    className="border rounded p-1"
                />
            </div>
            <div className="mt-4">
                {filteredDocuments?.length > 0 ? (
                    filteredDocuments.map((document) => (
                        <div
                            key={document._id}
                            className="flex justify-between items-center p-2 border-b"
                            onClick={() => onClick(document._id)}
                        >
                            <span>{document.title}</span>
                            <div className="flex gap-x-2">
                                <div
                                    role="button"
                                    onClick={(e) => onRestore(e, document._id)}
                                    className="text-blue-500"
                                >
                                    Restore
                                </div>
                                <div
                                    role="button"
                                    onClick={(e) => onRemove(e, document._id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center text-muted-foreground">No documents found.</div>
                )}
            </div>
        </div>
    );
};