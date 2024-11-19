import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";

type Params = { documentId: string };

interface DocumentIdPageProps {
  params: Params;
}

export default function DocumentIdPage({ params }: { params: Params }) {
  const [documentId, setDocumentId] = useState<Id<"documents"> | null>(null); // Use the correct type
  const Editor = useMemo(() => dynamic(() => import("@/components/Editor"), { ssr: false }), []);

  useEffect(() => {
    // Set the documentId from params when the component mounts
    setDocumentId(params.documentId as Id<"documents">); // Cast to Id<"documents">
  }, [params]);

  // Check if documentId is null before calling useQuery
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents"> // Cast to Id<"documents">, ensure it's not null
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    if (documentId) {
      update({
        id: documentId, // Correctly using id instead of documentId
        content
      });
    }
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}