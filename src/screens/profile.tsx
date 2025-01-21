import { Center, Text, VStack, Heading } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screenHeader";
import { UserPhoto } from "@components/userPhoto";
import { Button } from "@components/button";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: "https://github.com/0kira-vgl.png" }}
            size="xl"
            alt="Foto do Usuário"
          />

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$4"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input
              value="matheusgtiburcio@gmail.com"
              bg="$gray600"
              isReadOnly
            />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input
              placeholder="Confirme a nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
