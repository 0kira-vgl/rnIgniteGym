import {
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  Toast,
  ToastTitle,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/button";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { AppError } from "@utils/appError";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { Loading } from "@components/loading";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouterParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isloading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);

  const { exerciseId } = route.params as RouterParamsProps;

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$red500" action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$green700" action="success" variant="outline">
            <ToastTitle color="$white">
              Parabéns! Exercício registrado ao seu histórico.
            </ToastTitle>
          </Toast>
        ),
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$red500" action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontSize="$lg"
            fontFamily="$heading"
            flexShrink={1} // ajusta o tamanho do texto
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" textTransform="capitalize" ml="$1">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {isloading ? (
          <Loading />
        ) : (
          <VStack p="$8">
            <Box rounded="$lg" mb="$3" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Imagem do exercício"
                resizeMode="cover"
                rounded="$lg"
                w="$full"
                h="$80"
              />
            </Box>

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="$gray200" ml="$2">
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="$gray200" ml="$2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={sendingRegister}
              />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
