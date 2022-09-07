import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  CircularProgress,
  Divider,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AppointmentBlankGraph, Session, User } from "@lucem/shared-gql";
import AppointmentLists from "../components/organisms/ConsulationLists/consultation-lists";
import React, { useState } from "react";
import PatientInfo from "../components/organisms/ConsulationLists/patient-info";
import AppointmentSessionModal from "../components/organisms/SessionModal";
import { CreateAppointmentBlankFormSchema } from "compoments/organisms/SessionModal/shared/initialValues";
import EditAppointmentSessionModal from "../components/organisms/SessionModal/editAppointmentBlank";

interface PatientPageProps {
  patient: User;
  activeSession: Session;
  appointmentBlanksLoading: boolean;
  appointmentBlanks: AppointmentBlankGraph[];
  onCreateAppointmentBlank: (data: CreateAppointmentBlankFormSchema) => void;
  onEditAppointmentBlank: (data: CreateAppointmentBlankFormSchema) => void;
}

export const PatientPage: React.FC<PatientPageProps> = (props) => {
  const {
    patient,
    activeSession,
    appointmentBlanksLoading,
    appointmentBlanks,
    onCreateAppointmentBlank,
    onEditAppointmentBlank,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [openedBlank, setOpenedBlank] = useState<AppointmentBlankGraph | null>(
    null
  );
  const onCompleteCreate = (values: CreateAppointmentBlankFormSchema) => {
    onCreateAppointmentBlank(values);
    onClose();
  };
  const onCompleteEdit = (values: CreateAppointmentBlankFormSchema) => {
    onEditAppointmentBlank(values);
    onEditClose();
  };

  const onAppointmentItemClick = (appointment: AppointmentBlankGraph) => {
    setOpenedBlank(appointment);
    onEditOpen();
  };

  return (
    <>
      <Breadcrumb color="gray">
        <BreadcrumbItem>
          <BreadcrumbLink href="/patients">Пациенты</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={"/patients/" + patient._id}>
            {patient.fullName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mt={4} className="flex items-center justify-between">
        <Heading size="md" className="  font-bold ">
          {patient?.fullName}
        </Heading>
        <div className="flex items-center">
          {!!activeSession && (
            <>
              <Button
                onClick={onOpen}
                bg="primary"
                colorScheme="purple"
                className="btn-sm px-6 font-normal capitalize"
              >
                Перейти к приему
              </Button>
            </>
          )}
        </div>
      </Box>
      <Divider my={4} />
      <Box mt={4}>
        <PatientInfo patient={patient} />
      </Box>
      <div className="mt-4">
        <Box minHeight={"xs"} className="bg-base-200 p-4 rounded-lg">
          <Heading size={"xs"} className=" font-medium text-lg">
            Консультационные листы
          </Heading>
          {!appointmentBlanksLoading && (
            <AppointmentLists
              onAppointmentClick={onAppointmentItemClick}
              appointments={appointmentBlanks}
            ></AppointmentLists>
          )}
          {appointmentBlanksLoading && (
            <Center h={"xs"}>
              <Spinner></Spinner>
            </Center>
          )}{" "}
          {!appointmentBlanksLoading && !appointmentBlanks.length && (
            <Center h={"xs"}>
              <Text fontSize={"lg"}>Нет приемов...</Text>
            </Center>
          )}
        </Box>
      </div>
      <AppointmentSessionModal
        patient={patient}
        isOpen={isOpen}
        onClose={onClose}
        onComplete={onCompleteCreate}
      ></AppointmentSessionModal>
      {openedBlank && (
        <EditAppointmentSessionModal
          appointment={openedBlank}
          patient={patient}
          isOpen={isEditOpen}
          onClose={onEditClose}
          onComplete={onCompleteEdit}
        ></EditAppointmentSessionModal>
      )}
    </>
  );
};

export default PatientPage;
