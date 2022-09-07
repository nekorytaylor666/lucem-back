import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { renderSessionFormStep, sessionSteps } from "./config";
import { eventService } from "../../../src/utils/eventService";
import Modal from "components/atoms/Modal";
import { Form, Formik } from "formik";
import { CurrentSessionsStateType } from "../../../src/recoil/atoms/currentSession/index";
import { ConsultSessionEntity } from "@core/types/session/ISession";
import {
  appointmentInfoToSessionInitialValues,
  sessionInitialValues,
} from "./shared/initialValues";
import { PatientEntity } from "@core/types/patient/IPatient";
import { GetUserById_getUserByID } from "@graphqlTypes/GetUserById";
import { getAppointmentInfoUser } from "@graphqlTypes/getAppointmentInfoUser";
import { AppointmentInfo } from "../ConsulationLists/consultation-lists.service";

const EditAppointmentSessionModal: React.FC<{
  isOpen: boolean;
  patient: GetUserById_getUserByID;
  onClose: () => void;
  onComplete: (data: any) => void;
  session: AppointmentInfo;
}> = ({ active, onClose, onComplete, patient, session }) => {
  const onSessionComplete = (data: any) => {
    onComplete?.(data);
    return onClose();
  };
  return (
    <Modal active={active}>
      <div className="modal-box max-w-5xl overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="font-bold text-3xl w-1/2 mb-4">
            {patient.fullName}
          </span>
          <div className="flex flex-col w-52 space-y-1">
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Закрыть редактирование
            </button>
          </div>
        </div>
        <SessionContent
          session={session}
          onComplete={onSessionComplete}
        ></SessionContent>
      </div>
    </Modal>
  );
};

const SessionContent: React.FC<{
  onComplete: (data: any) => void;
  session: AppointmentInfo;
}> = ({ onComplete, session }) => {
  const [sessionStepIndex, setSessionStepIndex] = useState(0);
  const renderFormNavLinks = () =>
    sessionSteps.map((step, i) => (
      <li>
        <a
          onClick={() => {
            setSessionStepIndex(i);
          }}
          style={{ alignItems: "flex-start" }}
          className={`flex items-start justify-start rounded-lg ${
            i === sessionStepIndex && "active"
          }`}
        >
          <span className="mr-2">{i + 1}.</span>
          <span>{step.label}</span>
        </a>
      </li>
    ));

  const isLastStep = sessionStepIndex + 1 >= sessionSteps.length;

  const onNextStep = () => {
    if (isLastStep) {
      return;
    }
    setSessionStepIndex((i) => i + 1);
  };
  return (
    <Formik<ConsultSessionEntity>
      initialValues={appointmentInfoToSessionInitialValues(session)}
      onSubmit={(data) => {
        if (isLastStep) {
          return onComplete(data);
        }
      }}
    >
      <Form>
        <>
          <div className="">
            <div className="flex items-start">
              <aside>
                <ul className="menu w-40">{renderFormNavLinks()}</ul>
              </aside>
              <section className="flex-grow p-4 flex flex-col h-xxl max-h-xxl overflow-y-scroll">
                <AnimatePresence exitBeforeEnter>
                  {renderSessionFormStep(sessionStepIndex)}
                </AnimatePresence>
              </section>
            </div>
            <div className="modal-action flex flex-col m-0">
              <div>
                <div className=" border-b-2 border-base-200 w-full mb-2"></div>
                <div className="flex justify-between items-center w-full mr-1">
                  <div></div>
                  {isLastStep ? (
                    <button
                      onClick={onNextStep}
                      className="btn btn-primary px-6"
                      type="submit"
                    >
                      Сохранить изменения
                    </button>
                  ) : (
                    <button
                      onClick={onNextStep}
                      className="btn btn-primary px-6"
                      type="button"
                    >
                      Далее
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </Form>
    </Formik>
  );
};

export default EditAppointmentSessionModal;
