'use client'
import "./styles.css"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Placeholder } from '@tiptap/extensions'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { BulletList, ListItem } from '@tiptap/extension-list'
import { useEffect } from "react"
import MenuBar from './menu-bar'

type TiptapProps = {
  onChange: (value: string) => void,
  placeHolder: string
  value?: string | null
}
export default function Tiptap({onChange,placeHolder,value}: TiptapProps) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeHolder
      }),
      HorizontalRule,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
      ListItem
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-[20px] border border-7 border-white bg-white text-black",
      },
    },
    onUpdate:({editor}) => {
      onChange(editor.getHTML())
    },
    content: "<p></p>",
    autofocus: false
  })
  useEffect(() => {
    if (editor && value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  return (
    <>
      <EditorContent editor={editor} />
      <MenuBar editor={editor} />
    </>
  )
}



