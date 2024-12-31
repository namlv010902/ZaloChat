import { cn } from '@lib/utils';
import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', value, ...props }, ref) => {
    return (
     <div>
       <input
        type={type}
        className={cn(
          'flex bg-white file:border-0 file:bg-transparent file:text-sm file:font-medium w-full',
          className,
        )}
        ref={ref}
        value={value}
        {...props}
      />
     </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
