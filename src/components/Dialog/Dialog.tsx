import {
  Dialog as MuiDialog,
  DialogActions,
  Button,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { DialogContent, DialogTitle } from './Dialog.styles'

interface DialogProps extends MuiDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  name: string
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children, name, ...rest }) => {
  const { t } = useTranslation()
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      keepMounted
      transitionDuration={1000}
      data-testid={`${name}-dialog`}
      {...rest}
    >
      <DialogTitle data-testid={`${name}-dialog-title`}>{title}</DialogTitle>
      <DialogContent data-testid={`${name}-dialog-content`}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid={`${name}-dialog-close-button`}>
          {t('button.close')}
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
