import {
  children,
  createEffect,
  createMemo,
  createSignal,
  JSXElement,
  splitProps,
} from 'solid-js'
import { Portal, Dynamic } from 'solid-js/web'

import styles from './Dialog.module.css'

export interface Props {
  children: (onClose: () => void) => JSXElement
  onClose: () => void
}

export default function Dialog(props: Props) {
  const [getIsExiting, setIsExiting] = createSignal(false)

  function close() {
    setIsExiting(true)
  }

  return (
    <Portal>
      <div onClick={close} class={styles['dialog__overlay']} />
      <div
        onAnimationEnd={() => {
          if (getIsExiting()) {
            setIsExiting(false)
            props.onClose()
          }
        }}
        class={styles.dialog}
        classList={{ [styles['dialog--exiting']]: getIsExiting() }}
      >
        {props.children(close)}
      </div>
    </Portal>
  )
}
