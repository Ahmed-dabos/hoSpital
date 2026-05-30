import { type Editor } from "@tiptap/react"
import { Toggle } from "../ui/toggle"
import { 
    Bold, 
    Heading1,
    Heading2, 
    Heading3,
    HighlighterIcon, 
    Italic, 
    StrikethroughIcon, 
    AlignRight,
    AlignCenter,
    AlignLeft,
    List
    } from "lucide-react"
export default function MenuBar({ editor }: {editor: Editor } | {editor: null}) {
    if (!editor) {
    return null
  }
return (
    <div className="bg-white text-black mt-4">
        <div>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                pressed={editor.isActive('heading', { level: 1 })}
            >
                <Heading1 />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                pressed={editor.isActive('heading', { level: 2 })}
            >
                <Heading2 />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                pressed={editor.isActive('heading', { level: 3 })}
            >   
                <Heading3 />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().setParagraph().run()}
                pressed={editor.isActive('paragraph')}
            >
                P
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                pressed={editor.isActive('bold')}
            >
                <Bold />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                pressed={editor.isActive('italic')}
            >
                <Italic />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                pressed={editor.isActive('strike')}
            >
                <StrikethroughIcon />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                pressed={editor.isActive('highlight') }
            >
                <HighlighterIcon />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
                pressed={editor.isActive({ textAlign: 'left' }) }
            >
                <AlignLeft />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
                pressed={editor.isActive({ textAlign: 'center' }) }
            >
                <AlignCenter />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
                pressed={editor.isActive({ textAlign: 'right' }) }
            >
                <AlignRight/>
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                pressed={editor.isActive("bulletList") }
            >
                <List />
            </Toggle>
            <Toggle
                onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
                pressed={editor.isActive("horizontalRule") }
            >
                horizontal rule
            </Toggle>
        </div>
    </div>
    )
}