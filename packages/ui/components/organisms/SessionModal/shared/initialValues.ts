import {
  AppointmentBlankGraph,
  CalWeekdayGraph,
  EditSessionBlankMutation,
  EditSessionBlankMutationVariables,
  UploadSessionBlankMutationVariables,
} from "@lucem/shared-gql";
import { AppointmentInfo } from "components/organisms/ConsulationLists/consultation-lists.service";
import { addWeeks } from "date-fns";
import { EditorState } from "draft-js";
import _ from "lodash";

export type CreateAppointmentBlankFormSchema = Omit<
  UploadSessionBlankMutationVariables,
  "sessionId"
>;
export type EditAppointmentBlankFormSchema = Omit<
  EditSessionBlankMutationVariables,
  "sessionId"
>;
export const sessionInitialValues: CreateAppointmentBlankFormSchema = {
  diagnose: {
    preliminary: 1,
    diagnose: "",
    natureOfTheDesease: "",
    deseaseDBCode: "",
  },
  complaint: {
    complaint: "",
    sicknessTimeDuration: "",
    reason: "",
  },
  inspections: {
    data: [
      {
        description: "",
        images: undefined,
      },
    ],
  },
  appointmentResults: {
    photoURL: undefined,
    description: "",
  },
  treatmentPlan: {
    medical: [],
    proccess: [],
    recomendation: [],
  },
};

export type SessionInitialValues = typeof sessionInitialValues;

export const appointmentInfoToSessionInitialValues = (
  appointmentInfo: AppointmentBlankGraph
): SessionInitialValues => {
  const initialValues: EditAppointmentBlankFormSchema = {
    diagnose: {
      preliminary: true,
      diagnose: "",
      natureOfTheDesease: "",
      deseaseDBCode: "",
    },
    complaint: {
      complaint: "",
      sicknessTimeDuration: "",
      reason: "",
    },
    inspections: {
      data: [],
    },
  };

  var result = _.removeDeepByKey(appointmentInfo, "__typename");

  console.log("omit:", appointmentInfo, result);
  initialValues.diagnose = {
    ...result.diagnose,
    preliminary: result?.diagnose?.preliminary ? 1 : 0,
  };
  initialValues.inspections.data = result?.inspections ?? [];
  initialValues.appointmentBlankId = appointmentInfo._id;
  if (result.complaint) initialValues.complaint = result.complaint;
  console.log(result.diagnose);

  return initialValues;
};

export type sessionFormInitialType = typeof sessionInitialValues;
