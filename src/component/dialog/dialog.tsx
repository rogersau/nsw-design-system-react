import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export interface DialogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** id used for aria-labelledby and fragment id */
  id?: string
  /** Title shown in the dialog top area (can be string or node) */
  title?: React.ReactNode
  /** Content of the dialog */
  children?: React.ReactNode
  /** Footer actions (buttons) */
  footer?: React.ReactNode
  /** Optional custom trigger element. If provided it will be used as the Trigger (must be an element) */
  trigger?: React.ReactNode
  /** Convenience trigger text if you don't pass a trigger element */
  triggerText?: string
  /** class for the trigger wrapper (e.g. 'nsw-block') */
  triggerClassName?: string
  /** Button props applied when using the convenience trigger button */
  triggerButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /** Controlled open state (optional) */
  open?: boolean
  /** Default open (uncontrolled) */
  defaultOpen?: boolean
  /** onOpenChange handler */
  onOpenChange?: (open: boolean) => void
  /** The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. */
  modal?: boolean
  /** Whether clicking outside the dialog closes it. Defaults to true. */
  dismissible?: boolean
}

/**
 * NSW-styled Dialog component.
 *
 * Renders Radix Dialog but uses NSW classes so the markup matches the design system
 * and can be templated by passing `title`, `children` and `footer` props or a custom
 * `trigger` element.
 */
export const DialogComponent: React.FC<DialogProps> = ({
  id,
  title,
  children,
  footer,
  trigger,
  triggerText = 'Launch dialog',
  triggerClassName = 'nsw-block',
  triggerButtonProps,
  open,
  defaultOpen,
  onOpenChange,
  className = '',
  modal = true,
  dismissible = true,
  ...rest
}) => {
  const labelledBy = id ? `${id}-title` : undefined
  // Track open state so we can add NSW's `active` class which the CSS uses to show the dialog.
  const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen)
  // If `open` prop is provided use it (controlled), otherwise fallback to internal state
  const isOpen = typeof open === 'boolean' ? open : internalOpen

  useEffect(() => {
    // keep internal state in sync if defaultOpen changes (rare)
    if (defaultOpen !== undefined) setInternalOpen(!!defaultOpen)
  }, [defaultOpen])

  // handle open/close events from Radix. If component is uncontrolled, update internal state.
  const handleOpenChange = (next: boolean) => {
    // debug helper: emits in the console so we can inspect whether overlay clicks reach the handler
    // remove or gate this in production if noisy
    // eslint-disable-next-line no-console
    console.debug('[Dialog] handleOpenChange', next)
    if (typeof open !== 'boolean') setInternalOpen(next)
    if (onOpenChange) onOpenChange(next)
  }

  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={handleOpenChange}
      modal={modal}
    >
      {trigger ? (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      ) : (
        <div className={triggerClassName}>
          <Dialog.Trigger asChild>
            <button
              className='nsw-button nsw-button--dark'
              aria-haspopup='dialog'
              {...(triggerButtonProps || {})}
            >
              {triggerText}
            </button>
          </Dialog.Trigger>
        </div>
      )}

      <Dialog.Portal>
        {/* NSW markup: nsw-dialog root + wrapper/container/top/content/bottom */}
        <Dialog.Overlay asChild>
          <div
            className={`nsw-dialog ${
              isOpen ? 'active' : ''
            } ${className}`.trim()}
            style={{ display: isOpen ? 'flex' : 'none' }}
          >
            <Dialog.Content asChild onInteractOutside={(e) => {
              if (!dismissible) {
                e.preventDefault()
              }
            }}>
              <div
                id={id}
                role='dialog'
                aria-labelledby={labelledBy}
                {...(rest as any)}
              >
                <div className='nsw-dialog__wrapper'>
                  <div className='nsw-dialog__container'>
                <Dialog.Title asChild>
                  {title && (
                    <div className='nsw-dialog__top'>
                      <div className='nsw-dialog__title'>
                        <h2 id={labelledBy as string}>{title}</h2>
                      </div>
                      <Dialog.Close asChild className='nsw-dialog__close'>
                        <button className='nsw-icon-button' aria-label='Close'>
                          <span
                            className='material-icons nsw-material-icons'
                            aria-hidden='true'
                          >
                            close
                          </span>
                          <span className='sr-only'>Close</span>
                        </button>
                      </Dialog.Close>
                    </div>
                  )}
                </Dialog.Title>

                <div className='nsw-dialog__content'>{children}</div>
              </div>

              {footer && <div className='nsw-dialog__bottom'>{footer}</div>}
            </div>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogComponent
