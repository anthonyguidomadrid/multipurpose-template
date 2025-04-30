import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { Document } from '@contentful/rich-text-types'
import { DescriptionWrapper } from './ContentSection.style'

interface ContentSectionProps {
  title: string
  subtitle: string
  description?: Document
  sectionName: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  description,
  sectionName,
}) => (
  <>
    <Typography variant="h6" data-testid={`${sectionName}-subtitle`}>
      {subtitle}
    </Typography>
    <Typography variant="h2" data-testid={`${sectionName}-title`}>
      {title}
    </Typography>
    {description && (
      <DescriptionWrapper data-testid={`${sectionName}-description`}>
        {documentToReactComponents(description)}
      </DescriptionWrapper>
    )}
  </>
)
