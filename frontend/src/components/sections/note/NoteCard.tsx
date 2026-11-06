import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'

const NoteCard = ({
  id,
  title,
  content,
  parentId,
  createdAt,
  updatedAt,
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle>{title}</CardTitle>
        <span className="text-xs text-muted-foreground">
          Created {createdAt}
        </span>
      </CardHeader>

      <CardContent>
        <p>{content}</p>
        <span className="text-xs text-muted-foreground">
          Last edited {updatedAt}
        </span>
      </CardContent>
    </Card>
  )
}

export default NoteCard