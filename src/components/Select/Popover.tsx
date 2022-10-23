import {
  DismissButton,
  FocusScope,
  mergeProps,
  useDialog,
  useModal,
  useOverlay,
  AriaOverlayProps,
  ModalAria,
  DialogAria,
  OverlayAria
} from 'react-aria'
import { forwardRef, HTMLProps, ForwardedRef, RefObject } from 'react'
import { FocusableElement } from '@react-types/shared';

interface PopoverProps extends AriaOverlayProps, HTMLProps<HTMLDivElement> {}

export const Popover = forwardRef(({
  title,
  children,
  isOpen,
  onClose,
  style,
  ...otherProps
}: PopoverProps, ref: ForwardedRef<HTMLDivElement>) => {
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const { overlayProps }: OverlayAria = useOverlay({
    onClose,
    isOpen,
    isDismissable: true
  }, ref as RefObject<HTMLDivElement>)

  // Hide content outside the modal from screen readers.
  const { modalProps }: ModalAria = useModal()

  // Get props for the dialog and its title
  const { dialogProps, titleProps }: DialogAria = useDialog({}, ref as RefObject<FocusableElement>)

  return (
    <FocusScope restoreFocus>
      <div
        {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
        ref={ref}
        style={{
          ...style
        }}
      >
        <h3
          {...titleProps}
          style={{ marginTop: 0 }}
        >
          {title}
        </h3>
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
})
