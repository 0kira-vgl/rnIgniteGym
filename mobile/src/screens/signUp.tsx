import {
  Center,
  Image,
  VStack,
  Text,
  Heading,
  ScrollView,
  useToast,
  Toast,
  ToastTitle,
} from "@gluestack-ui/themed";
import BackGroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

// tipagem dos inputs
const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup
    .string()
    .required("E-mail é obrigatório.")
    .email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), ""], "A confimação da senha não confere."),
});

export function SignUp() {
  const toast = useToast();
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema), // passando as types dos inputs
  });

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      // faz uma requisição POST para criar um novo usuário no backend
      // envia os dados "name", "email" e "password" para o caminho "/users"
      await api.post("/users", { name, email, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      // verifica se o erro é do tipo AppError (erro personalizado)
      const isAppError = error instanceof AppError;

      // define a mensagem a ser exibida:
      // - se for AppError, mostra a mensagem específica do erro.
      // - se não for, mostra uma mensagem genérica de falha.
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      // exibe uma notificação (toast) com a mensagem de erro
      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$red500" action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Pessoas treinando"
          w="$full"
          h={624}
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e seu corpo.
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry // oculta oq é digitado
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Já tem uma conta?
            </Text>

            <Button
              title="Fazer Login"
              variant="outline"
              onPress={() => navigation.goBack()}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
