import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "@lucem/shared-gql";
import { format } from "date-fns";
import { calculateAge } from "../../../utils/dates";

const PatientInfo = ({ patient }: { patient: User }) => {
  return (
    <Box>
      <Grid templateColumns="repeat(8, 1fr)" gap={4}>
        <GridItem
          colSpan={1}
          className="avatar  flex items-center justify-center"
        >
          <Avatar
            size="xl"
            bg="primary"
            color="white"
            name={patient.fullName}
          />
        </GridItem>

        <GridItem colSpan={3} className="h-full bg-base-200 rounded-lg  p-4">
          <VStack w="full" alignItems={"start"}>
            <Text fontSize={"xl"} fontWeight="medium">
              Основное
            </Text>

            <HStack className="flex items-center justify-start">
              <Text color="base-300">Дата рождение:</Text>
              <Text>
                {format(new Date(patient.dateOfBirth), "dd/MM/yyyy")} года
              </Text>
            </HStack>
            <HStack className="flex items-center justify-start">
              <Text color="base-300">Возраст:</Text>
              <Text>{calculateAge(patient.dateOfBirth)} года</Text>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={4} className="h-full bg-base-200 rounded-lg  p-4">
          <VStack w="full" alignItems={"start"}>
            <Text fontSize={"xl"} fontWeight="medium">
              Контакты
            </Text>
            <HStack className="flex items-center justify-start">
              <Text color="base-300">Телефон:</Text>
              <Text>{patient.phoneNumber}</Text>
            </HStack>
            <HStack className="flex items-center justify-start">
              <Text color="base-300">Почта:</Text>
              <Text>{patient.email}</Text>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PatientInfo;
