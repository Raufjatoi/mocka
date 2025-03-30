import React from 'react'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file' 
} 

const FormField = ({control , name , label , placeholder, type="text"}: FormFieldProps<T>) => (
  <Controller name={name} control={control} render={({ field }) => (
  <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
              <Input className='input text-blue-100' placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage />
  </FormItem>

)} 
/>
);
        
export default FormField