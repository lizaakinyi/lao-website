import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

export function RichTextRenderer({
  data,
  className,
}: {
  data: SerializedEditorState
  className?: string
}) {
  return <RichText data={data} className={className} />
}
