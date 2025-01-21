import { Heading, VStack, Text } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screenHeader";
import { HistoryCard } from "@components/historyCard";
import { useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "19.10.24",
      data: ["Pulley Frente", "Remada Unilateral"],
    },
    {
      title: "19.10.24",
      data: ["Pulldown"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
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
        renderItem={() => <HistoryCard />}
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
