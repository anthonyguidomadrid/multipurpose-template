import { Grid2 } from '@mui/material'
import { ContentSection, ContentSectionProps } from '../ContentSection/ContentSection'
import { Cta } from '@/lib/types'
import { DetailsCta } from '../DetailsCta/DetailsCta'

interface DetailsContentProps extends ContentSectionProps {
  cta: Cta
}

export const DetailsContent: React.FC<DetailsContentProps> = ({
  subtitle,
  title,
  description,
  sectionName,
  cta,
}) => {
  return (
    <Grid2 container>
      <Grid2 size={8}>
        <ContentSection
          subtitle={subtitle}
          title={title}
          description={description}
          sectionName={sectionName}
        />
      </Grid2>
      <Grid2 size={4}>
        <DetailsCta {...cta} />
      </Grid2>
    </Grid2>
  )
}
