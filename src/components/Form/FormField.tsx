import React from 'react';
import { FormLabel } from '@/components/FormLabel';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  children
}) => {
  return (
    <>
      <FormLabel 
        id={id} 
        htmlFor={id} 
        labelText={required ? `${label} *` : label}
        className="text-base" 
      />
      
      <>
        {children}
      </>
      
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </>
  );
};