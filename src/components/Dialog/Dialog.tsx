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
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children, ...rest }) => {
  const { t } = useTranslation()
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      keepMounted
      transitionDuration={1000}
      data-testid="dialog"
      {...rest}
    >
      <DialogTitle data-testid="dialog-title">{title}</DialogTitle>
      <DialogContent data-testid="dialog-content">{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="dialog-close-button">
          {t('button.close')}
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
