'use client'

import Image from "next/image";
import { useParams } from "next/navigation";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export function Cover({ url, preview }: CoverProps) {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState(url);

  useEffect(() => {
    setCoverUrl(url);
  }, [url]);

  const isValidUrl = (url: string | undefined) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  const onRemove = async () => {
    if (isValidUrl(coverUrl)) {
      setLoading(true);
      try {
        await edgestore.publicFiles.delete({ url: coverUrl });
        await removeCoverImage({ id: params.documentId as Id<'documents'> });
        setCoverUrl(null); // Update state to trigger re-render
      } catch (error) {
        console.error("Error removing cover image:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid URL:", coverUrl);
    }
  };

  return (
    <div className={cn(`relative w-full h-[35vh] group`,
      !coverUrl && 'h-[12vh]',
      coverUrl && 'bg-muted')}>
      {!!coverUrl && (
        <Image className="object-cover" src={coverUrl} alt='Cover' fill />
      )}
      {coverUrl && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex gap-x-2 items-center">
          <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={() => coverImage.onReplace(coverUrl)}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
          <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={onRemove} disabled={loading}>
            <X className="w-4 h-4 mr-2" />
            {loading ? "Removing..." : "Remove"}
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  );
}