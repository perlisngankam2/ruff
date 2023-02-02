import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    forwardRef,
    Box
  } from '@chakra-ui/react';
  import {
    Select,
    Props as SelectProps,
    ChakraStylesConfig,
    ActionMeta
  } from 'chakra-react-select';
  import { useMemo, useState } from 'react';
  import { FieldError } from 'react-hook-form';
import { boolean } from 'yup';

  // import colors from '@/modules/theme/colors';
  
  // export const OptionBase = {
  //   label,
  //   value,
  // };
  
  // const FormSelectProps = {
  //   label,
  //   error?: FieldError;
  // } & SelectProps;
  
//   const FieldError = {
//     type: LiteralUnion<keyof RegisterOptions, string>;
//     root?: FieldError;
//     ref?: Ref;
//     types?: MultipleFieldErrors;
//     message?: Message;
// };


// const FormSelectProps = {
//   label:"error",
//   error: FieldError,
// } & SelectProps;

export const colorOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" }
]

export const groupedOptions = [
  {
    label: "Colours",
    options: colorOptions
  }
];

  const FormSelect  = () => { 


    /** Close the select menu when the user selects an option */
    closeMenuOnSelect: boolean;

/** Support multiple selected options */

    // isMulti = IsMulti;

    // forwardRef<FormSelectProps>
    //  (
    // (   { 
    //   // name, 
    //   // error, 
    //   // label,
    //   //  value, 
    //   //  options, 
    //   //  isMulti, 
    //   //  onChange,
    //     ...rest }, ref) => {
      // const chakraStyles = {
      //   container: (provided) => ({
      //     ...provided,
      //     bg: 'white'
      //   }),
      //   option: (provided, state) => ({
      //     ...provided,
      //     color: 'text.default',
      //     fontWeight: state.isSelected ? 'semibold' : 'normal',
      //     bg: state.isSelected ? 'primary' : '',
      //     _hover: {
      //       bg: 'gray.100',
      //       color: colors.text.default
      //     }
      //   })
      // };
  
      // const handleChange = (
      //   newValue,
      //   actionMeta,
      // ) => {
      //   const newValueParsed = isMulti
      //     ? (newValue).map(
      //         (optionSelected) => optionSelected.value
      //       )
      //     : (newValue).value;
  
      //   return onChange?.(newValueParsed, actionMeta);
      // };
  
      // const formattedValue = useMemo(
      //   () =>
      //     isMulti
      //       ? (options || []).filter((option) =>
      //           (value).find(
      //             (item) => item === (option).value
      //           )
      //         )
      //       : options?.find((option) => (option).value === value) ||
      //         {},
      //   [isMulti, options, value]
      // );
  
      return (
        <Box> 
          <FormControl 
            // isInvalid={!!error} 
            position="relative" 
            zIndex={10}
          >
            <FormLabel 
            >
              {/* {label} */}
           </FormLabel>
            <Select
              // ref={ref}
              // {...rest}
              options={groupedOptions}
              isMulti 
              closeMenuOnSelect = {'false'}
              placeholder="Faites un choix"
            />
           {/* {error && <FormErrorMessage>{error.message}
          </FormErrorMessage>} */}
          </FormControl> 
        </Box>
      );
    }
  // );
// }
  export default FormSelect;
  