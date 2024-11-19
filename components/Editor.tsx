'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({ onChange, initialContent, editable = true }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        uploadImage: handleUpload,
      }),
    ],
    content: initialContent || '',
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ${
          resolvedTheme === 'dark' ? 'prose-invert' : ''
        }`,
      },
    },
  });

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;