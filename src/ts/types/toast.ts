// libraries
import React from 'react';

type ToastTypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

interface ToastType {
  type: ToastTypeOptions;
}

export interface ToastParams extends ToastType {
  text: string,
}

export interface ToastOptions extends ToastType  {
  type: ToastTypeOptions;
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  autoClose?: number | false;
  hideProgressBar?: boolean;
  draggable?: boolean;
  draggablePercent?: number;
  transition?: React.ComponentType;
}
