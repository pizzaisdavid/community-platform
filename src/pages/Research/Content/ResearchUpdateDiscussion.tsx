import { useState } from 'react'
import { DiscussionWrapper } from 'src/common/DiscussionWrapper'

import type { IResearch } from 'src/models'

interface IProps {
  update: IResearch.Update
  research: IResearch.Item | undefined
  showComments?: boolean
}

export const ResearchUpdateDiscussion = (props: IProps) => {
  const { update, research, showComments } = props
  const [, setTotalCommentsCount] = useState<number>(0)

  return (
    <DiscussionWrapper
      sourceType="researchUpdate"
      sourceId={update._id}
      setTotalCommentsCount={setTotalCommentsCount}
      showComments={showComments}
      primaryContentId={research._id}
      canHideComments
    />
  )
}
