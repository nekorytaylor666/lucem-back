import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { renderSessionFormStep, sessionSteps } from "./config";
import { Form, Formik, withFormik, FormikBag } from "formik";

import {
  CreateAppointmentBlankFormSchema,
  SessionInitialValues,
  sessionInitialValues,
} from "./shared/initialValues";
import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { UploadSessionBlankMutationVariables, User } from "@lucem/shared-gql";

const AppointmentSessionModal: React.FC<{
  isOpen: boolean;
  patient: User;
  onClose: () => void;
  onComplete: (data: CreateAppointmentBlankFormSchema) => void;
}> = ({ isOpen, onClose, patient, onComplete }) => {
  const onSessionComplete = (data: CreateAppointmentBlankFormSchema) => {
    onComplete?.(data);
    return onClose();
  };
  return (
    <Modal
      size="full"
      scrollBehavior={"inside"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent m={8}>
        <ModalHeader>
          <Heading fontSize={24}>Прием пациента: {patient.fullName}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider></Divider>
        <ModalBody>
          <AppointmentBlankForm
            onComplete={onSessionComplete}
          ></AppointmentBlankForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface AppointmentBlankFormProps {
  onComplete: (data: CreateAppointmentBlankFormSchema) => void;
}

const AppointmentBlankForm: React.FC<AppointmentBlankFormProps> = ({
  onComplete,
}) => {
  const [sessionStepIndex, setSessionStepIndex] = useState(0);

  const isLastStep = sessionStepIndex + 1 >= sessionSteps.length;

  const onNextStep = () => {
    if (isLastStep) {
      return;
    }
    setSessionStepIndex((i) => i + 1);
  };

  const StepActions = () => {
    if (isLastStep) {
      return (
        <Button type="submit" colorScheme={"purple"} onClick={onNextStep}>
          Завершить прием
        </Button>
      );
    }
    return (
      <Button type="button" colorScheme={"purple"} onClick={onNextStep}>
        Следующий шаг
      </Button>
    );
  };
  return (
    <Formik<CreateAppointmentBlankFormSchema>
      initialValues={sessionInitialValues}
      onSubmit={(data) => {
        return onComplete(data);
      }}
    >
      <Form>
        <Tabs
          index={sessionStepIndex}
          onChange={setSessionStepIndex}
          variant="unstyled"
          isLazy
        >
          <Grid w="full" gridTemplateColumns={"200px 1fr"} gap={4}>
            <TabList display={"flex"} flexDirection="column">
              {sessionSteps.map((step, i) => (
                <Tab
                  rounded={"md"}
                  p={4}
                  sx={{
                    color: "black",
                    bg: "white",
                  }}
                  _hover={{ bg: "base-200" }}
                  _selected={{ color: "white", bg: "primary" }}
                >
                  <Text w="full" textAlign={"left"}>
                    {i + 1}. {step.label}
                  </Text>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {sessionSteps.map((step) => (
                <TabPanel>
                  {step.formComponent}
                  <Divider my={4}></Divider>
                  {<StepActions />}
                </TabPanel>
              ))}
            </TabPanels>
          </Grid>
        </Tabs>
      </Form>
    </Formik>
  );
};

export default AppointmentSessionModal;
