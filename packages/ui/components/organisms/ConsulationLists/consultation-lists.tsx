import { Box, Grid, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { AppointmentBlankGraph } from "@lucem/shared-gql";
import { toCleanHtml } from "../../../utils/renderRawHtml";
import { format } from "date-fns";
import React from "react";

const AppointmentLists: React.FC<{
  appointments: AppointmentBlankGraph[];
  onAppointmentClick: (appoitment: AppointmentBlankGraph) => void;
}> = ({ appointments, onAppointmentClick }) => {
  return (
    <SimpleGrid columns={2} gap={4} mt={4}>
      {appointments?.map((appointment) => (
        <AppointmentItem
          onAppointmentClick={() => onAppointmentClick(appointment)}
          appointment={appointment}
        ></AppointmentItem>
      ))}
    </SimpleGrid>
  );
};

const AppointmentItem = ({
  appointment,
  onAppointmentClick,
}: {
  appointment: AppointmentBlankGraph;
  onAppointmentClick: (appointment: AppointmentBlankGraph) => void;
}) => (
  <Box
    onClick={() => onAppointmentClick(appointment)}
    className=" bg-white text-black p-4 rounded shadow-md"
  >
    <VStack align={"flex-start"}>
      <Text className="font-medium mb-2">
        {/*{format(new Date(appointment.createdAt), "dd.MM.yyyy HH:mm")}*/}
        {/* {appointment?.date &&
                    format(new Date(appointment?.date), "dd.MM.yyyy HH:mm")} */}
      </Text>
      <Box className="mb-4">
        <Text className="text-dark-grey">Диагноз:</Text>
        <div
          dangerouslySetInnerHTML={{
            __html: toCleanHtml(appointment.diagnose?.deseaseDBCode ?? ""),
          }}
        />
      </Box>
      <Box>
        <Text className="text-dark-grey">Врач:</Text>
        <Text>
          {appointment?.owners?.map((el) => el?.doctor?.fullName).join(", ")}
        </Text>
      </Box>
    </VStack>
  </Box>
);

export default AppointmentLists;
