import {
  CreateTreatmentPlanItemGraph,
  useAddDoctorToAppointmentBlankMutation,
  useCreateBookingMutation,
} from "@lucem/shared-gql";

import { getDoctorTokens } from "../../../utils/getTokens";
import { addMinutes, format } from "date-fns";
import { Field, FieldArray, useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AddServiceModal, ServicePayload } from "./AddServiceModal";
import { useCurAppointmentBlank } from "./editAppointmentBlank";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";
import { AddCalendarService } from "./AddCalendarService";
import { CreateAppointmentBlankFormSchema } from "./shared/initialValues";
import _ from "lodash";

export const CuringPlanForm: React.FC<SessionFormComponentProps> = () => {
  const [
    createBookingMutation,
    { loading: bookingLoading, error: bookingError },
  ] = useCreateBookingMutation();

  const [addDoctorToBlank] = useAddDoctorToAppointmentBlankMutation();
  const [addServiceModalVisible, setAddServiceModalVisible] = useState(false);

  const router = useRouter();
  const { appointmentBlank } = useCurAppointmentBlank();
  const { token } = getDoctorTokens();
  const [services, setServices] = useState<ServicePayload[]>([]);
  const submitBookings = async () => {
    await services.map(async (service) => {
      const startDate = new Date(service.bookingtime);
      const endDate = addMinutes(startDate, 30);
      const userId = router.query.patientId as string;
      await addDoctorToBlank({
        variables: {
          appointmentBlankId: appointmentBlank?._id ?? "",
          doctorId: service.doctorId,
        },
        context: {
          headers: {
            Authorization: token,
          },
        },
      });
      await createBookingMutation({
        variables: {
          doctorId: service.doctorId,
          serviceId: service.serviceId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          userId: userId,
        },
        context: {
          headers: {
            Authorization: token,
          },
        },
        onCompleted({ createBooking }) {},
      });
    });
  };

  const onAddService = (service: ServicePayload) => {
    setServices([...services, service]);
  };
  const onRemoveService = (service: ServicePayload) => {
    setServices(services.filter((s) => s.serviceId !== service.serviceId));
  };

  return (
    <FormAnimatedContainer>
      <div className="w-full bg-base-200 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="mr-2 h-5 w-5 object-contain"
              src="/icons/Stack.svg"
              alt="stack"
            />
            <span className="font-bold h-auto">Услуги</span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setAddServiceModalVisible(!addServiceModalVisible)}
              className="btn btn-primary btn-outline border-none"
            >
              <PlusIcon></PlusIcon>
              Добавить
            </button>
          </div>
        </div>
        {/* <Diagnostic3sItem></Diagnostic3sItem> */}
        {addServiceModalVisible && (
          <AddServiceModal
            onAddService={(payload) => {
              onAddService(payload);
              setAddServiceModalVisible(false);
            }}
          ></AddServiceModal>
        )}
        {services.map((service) => (
          <ServiceItem
            onDelete={() => onRemoveService(service)}
            service={service}
          ></ServiceItem>
        ))}
        {!addServiceModalVisible && (
          <button
            type="button"
            onClick={submitBookings}
            className="mt-4 btn btn-primary w-full py-2"
          >
            Записать на перечисленные услуги
          </button>
        )}
      </div>
      <TreatmentPlanForm></TreatmentPlanForm>
    </FormAnimatedContainer>
  );
};
const ServiceItem = ({
  service,
  onDelete,
}: {
  service: ServicePayload;
  onDelete: () => void;
}) => {
  return (
    <div className="w-full bg-base-100 rounded-lg p-4 shadow-md my-2">
      <div className="flex items-center justify-between">
        {service.actionType.value === "booking" ? (
          <div className="flex flex-col">
            <span>Запись на {service.service.name}</span>
            <span className="text-sm text-base-300">
              {format(new Date(service.bookingtime), "dd.MM.yyyy HH:mm")}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>Запись на {service.service.name}</span>
            <span className="text-sm text-base-300">
              Годен до:{" "}
              {service.dateType === "expirable"
                ? format(new Date(service.expireDate), "dd.MM.yyyy")
                : "Безлимит"}
            </span>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={onDelete}
            className="btn btn-error py-2 bg-transparent text-warning hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const TreatmentPlanForm = () => {
  const [
    addMedicalAppointmentFormVisible,
    setAddMedicalAppointmentFormVisible,
  ] = useState(false);
  const [addProceduresFormVisible, setAddProceduresFormVisible] =
    useState(false);
  const [addRecommendationsFormVisible, setAddRecommendationsFormVisible] =
    useState(false);

  return (
    <>
      <TreatmentElement
        field={"treatmentPlan.medical"}
        heading="Медикаментозные назначения"
      />

      <TreatmentElement field={"treatmentPlan.proccess"} heading="Процедуры" />
      <TreatmentElement
        field={"treatmentPlan.recomendation"}
        heading="Рекомендации"
      />
      {/* <div className="w-full bg-base-200 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="mr-2 h-5 w-5 object-contain"
              src="/icons/Stack.svg"
              alt="stack"
            />
            <span className="font-bold h-auto">Процедуры</span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() =>
                setAddProceduresFormVisible(!addProceduresFormVisible)
              }
              className="btn btn-primary btn-outline border-none"
            >
              <PlusIcon></PlusIcon>
              Добавить
            </button>
          </div>
        </div>

        {addProceduresFormVisible && (
          <AddCalendarService
            type={"Procedures"}
            onAddCalendarService={() => {}}
          />
        )}
      </div>

      <div className="w-full bg-base-200 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="mr-2 h-5 w-5 object-contain"
              src="/icons/Stack.svg"
              alt="stack"
            />
            <span className="font-bold h-auto">Рекомендации</span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() =>
                setAddRecommendationsFormVisible(!addRecommendationsFormVisible)
              }
              className="btn btn-primary btn-outline border-none"
            >
              <PlusIcon></PlusIcon>
              Добавить
            </button>
          </div>
        </div>

        {addRecommendationsFormVisible && (
          <AddCalendarService
            type={"Recommendations"}
            onAddCalendarService={() => {}}
          />
        )}
      </div> */}
    </>
  );
};
function TreatmentElement({ field, heading }) {
  const { values } = useFormikContext<CreateAppointmentBlankFormSchema>();
  const curFieldValues = _.get(values, field) as CreateTreatmentPlanItemGraph[];
  return (
    <div className="w-full bg-base-200 rounded-lg p-4 mb-2">
      <FieldArray
        name={field}
        render={(arrayHelpers) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="mr-2 h-5 w-5 object-contain"
                src="/icons/Stack.svg"
                alt="stack"
              />
              <span className="font-bold h-auto">{heading}</span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    repeatingOptions: { freq: "DAILY" },
                    text: "",
                  })
                }
                className="btn btn-primary btn-outline border-none"
              >
                <PlusIcon></PlusIcon>
                Добавить
              </button>
            </div>
          </div>
        )}
      ></FieldArray>
      {curFieldValues?.map((medValues, i) => (
        <AddCalendarService field={field} index={i} />
      ))}
    </div>
  );
}
