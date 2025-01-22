import {
  FormControl,
  Input as GluestackInput,
  InputField,
  FormControlErrorText,
  FormControlError,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid; // vê se é erro de mensagem ou invalido (!! deixa true)

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        isInvalid={invalid}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500",
        }}
        $focus={{
          borderWidth: 1,
          borderColor: isInvalid ? "$red500" : "$green500",
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          bg="$gray700"
          px="$4"
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
