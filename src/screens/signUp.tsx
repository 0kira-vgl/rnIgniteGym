import {
  Center,
  Image,
  VStack,
  Text,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed";
import BackGroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    console.log(name);
  };

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

            <Input placeholder="Nome" onChangeText={setName} />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              secureTextEntry // oculta oq é digitado
              onChangeText={setPassword}
            />

            <Input
              placeholder="Confirme a senha"
              secureTextEntry
              onChangeText={setPasswordConfirm}
            />

            <Button title="Criar e acessar" onPress={handleSignUp} />
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
