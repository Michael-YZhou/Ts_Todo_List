import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  // The useRef type needs to explicitly define HTMLDialogElement | null
  // because React initializes refs with null.
  // Without this type, TypeScript assumes it could also be undefined.
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const dialog = dialogRef.current;

    // Check if the dialog reference is not null and the dialog is not already open before showing it
    //  In strict mode, showModal() might be called twice and cause the Modal to close immediately
    if (dialog && !dialog.open) {
      dialog.showModal();
    } else {
      console.error("Dialog reference is null.");
    }

    // cleanup function to close the dialog when the component is unmounted
    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  // problematic styling
  //

  // createPortal is used to render the dialog element in the #modal div
  return createPortal(
    <dialog
      className="m-0 p-8 fixed top-[10vh] left-[calc(50%-15rem)] w-[30rem] max-h-[80vh] bg-[#e2e5eb] border-none rounded-md z-[100] shadow-md flex flex-col justify-between animate-slide-down-fade-in"
      ref={dialogRef}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
