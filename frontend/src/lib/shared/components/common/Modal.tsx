"use client";
import { createPortal } from "react-dom";
import { cn } from "@lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Button } from "./Button";

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  btnCancelText?: string;
  btnConfirmText?: string;
  className?: ClassNameValue;
  showCloseButton?: boolean;
  showFooter?: boolean;
  styleFooter?: ClassNameValue;
}

const modalVariants = cva("", {
  variants: {
    size: {
      md: "w-screen sm:w-64 md:w-max",
      lg: "w-screen sm:w-80 md:w-[50%]",
      xl: "w-screen sm:w-96 md:w-[80%]",
    },
    position: {
      center: "top-1/2 transform -translate-y-1/2",
      bottom: "bottom-0",
      top: "top-0",
    },
  },
  defaultVariants: {
    size: "md",
    position: "center",
  },
});

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  btnCancelText = "Cancel",
  btnConfirmText = "Confirm",
  className,
  showCloseButton = true,
  size,
  position,
}) => {
  const [key, setKey] = useState(1);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [isOpen]);

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        key={key}
        className={cn(
          " z-10 p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300",
          modalVariants({ position, size }),
          isOpen ? "scale-100" : "scale-95",
          className
        )}
      >
        {/* Header */}

        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}

          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        <div className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
          >
            {btnCancelText}
          </Button>
          <Button >
            {btnConfirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export { Modal };
