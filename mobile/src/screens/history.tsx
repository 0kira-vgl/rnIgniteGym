import {
  Heading,
  VStack,
  Text,
  Toast,
  ToastTitle,
  useToast,
} from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screenHeader";
import { HistoryCard } from "@components/historyCard";
import { useCallback, useEffect, useState } from "react";
import { SectionList } from "react-native";
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { Loading } from "@components/loading";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/historyByDayDTO";

export function History() {
  const toast = useToast();
  const [isloading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function getItems() {
    try {
      setIsLoading(true);

      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";

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

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {"\n"} Vamos treinar hoje?
          </Text>
        )}
        renderItem={({ item }) =>
          isloading ? <Loading /> : <HistoryCard data={item} />
        }
        renderSectionHeader={({ section }) => (
          <Heading
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$10"
            mb="$3"
          >
            {section.title}
          </Heading>
        )}
      />
    </VStack>
  );
}
