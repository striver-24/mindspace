import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteViewRaw, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps {
  onChange: (value: string) => void; // Callback for content change
  initialContent?: string; // Optional initial content
  editable?: boolean; // Editable flag
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
  const { resolvedTheme } = useTheme(); // Get the resolved theme (light/dark)
  const { edgestore } = useEdgeStore(); // Access edge store for file uploads

  // Function to handle file uploads
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url; // Return the URL of the uploaded file
  };

  // Initialize the BlockNote editor with default components
  // Initialize the BlockNote editor
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload // Set the upload handler
  });

  return (
    <div>
      <BlockNoteViewRaw
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        onChange={() => {
          onChange(JSON.stringify(editor.topLevelBlocks, null, 2)); // Call onChange with the updated content
        }}
      />
    </div>
  );
}

export default Editor;