import { useMutation } from "@apollo/client";
import {
  CreateBooking,
  CreateBookingVariables,
} from "@graphqlTypes/CreateBooking";
import {
  CreateForward,
  CreateForwardVariables,
} from "@graphqlTypes/CreateForward";
import {
  ADD_DOCTOR_TO_BLANK,
  CREATE_BOOKING_MUTATION,
} from "@src/api/mutations/create-booking";
import { CREATE_FORWARD } from "@src/api/mutations/create-forward";
import { getDoctorTokens } from "@src/utils/getToken";
import { addMinutes, format } from "date-fns";
import { Field } from "formik";
import { useRouter } from "next/router";
import { CurBlankIdContext } from "pages/patients/[patientId]/[route]";
import React, { useContext, useState } from "react";
import { AddServiceModal, ServicePayload } from "./AddServiceModal";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";

export const CuringPlanForm: React.FC<SessionFormComponentProps> = () => {
  const [
    createBookingMutation,
    { loading: bookingLoading, error: bookingError },
  ] = useMutation<CreateBooking, CreateBookingVariables>(
    CREATE_BOOKING_MUTATION,
  );
  const [
    createForwardMutation,
    { loading: forwardLoading, error: forwardError, called: forwardCalled },
  ] = useMutation<CreateForward, CreateForwardVariables>(CREATE_FORWARD);
  const [addDoctorToBlank] = useMutation(ADD_DOCTOR_TO_BLANK);
  const [addServiceModalVisible, setAddServiceModalVisible] = useState(false);
  const router = useRouter();
  const curBlank = useContext(CurBlankIdContext);

  const { token } = getDoctorTokens();
  const [services, setServices] = useState<ServicePayload[]>([]);
  const submitBookings = async () => {
    await services.map(async (service) => {
      const startDate = new Date(service.bookingtime);
      const endDate = addMinutes(startDate, 30);
      const userId = router.query.patientId as string;
      await addDoctorToBlank({
        variables: {
          appointmentBlankId: curBlank._id,
          doctorId: service.doctorId,
        },
        context: {
          // example of setting the headers with context per operation
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
          // example of setting the headers with context per operation
          headers: {
            Authorization: token,
          },
        },
        onCompleted({ createBooking }) { },
      });
      // if (service.actionType.value === "forward")
      //     await createForwardMutation({
      //         variables: {
      //             serviceId: [service.serviceId],
      //             userId,
      //         },
      //         context: {
      //             // example of setting the headers with context per operation
      //             headers: {
      //                 Authorization: token,
      //             },
      //         },
      //         onCompleted({ createForward }) {
      //
      //         },
      //     });
    });
    alert("Записи сделаны!");
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
              onClick={() =>
                setAddServiceModalVisible(
                  !addServiceModalVisible,
                )
              }
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
      {/* <div className="mt-8 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className="text-lg font-medium mr-2">План лечения</p>
                        <div className="btn-group">
                            <button className="btn btn-active">
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
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </button>
                            <button className="btn  btn-outline btn-primary">
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <select className="select flex-grow bg-base-200 w-64 font-light mr-2">
                            <option disabled selected>
                                Новый шаблон
                            </option>
                        </select>
                        <button className="btn btn-primary btn-outline">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full bg-base-200 rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="font-bold h-auto">
                            Медикаментозные назначения
                        </span>
                    </div>
                    <div className="flex items-center">
                        <button className="btn btn-primary btn-outline border-none">
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
                            Добавить
                        </button>
                    </div>
                </div>
            </div> */}
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
              {format(
                new Date(service.bookingtime),
                "dd.MM.yyyy HH:mm",
              )}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>Запись на {service.service.name}</span>
            <span className="text-sm text-base-300">
              Годен до:{" "}
              {service.dateType === "expirable"
                ? format(
                  new Date(service.expireDate),
                  "dd.MM.yyyy",
                )
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
