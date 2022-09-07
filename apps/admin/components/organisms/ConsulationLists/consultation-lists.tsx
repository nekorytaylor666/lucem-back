import { PatientEntity } from "@core/types/patient/IPatient";
import { Session } from "@core/types/session/ISession";
import { patientSelector } from "@recoil/atoms/patients";
import { toCleanHtml } from "@src/utils/renderRawHtml";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { AppointmentInfo } from "./consultation-lists.service";

const AppointmentLists: React.FC<{
    appointments: AppointmentInfo[];
    onAppointmentClick: (appoitment: AppointmentInfo) => void;
}> = ({ appointments, onAppointmentClick }) => {
    return (
        <div className="grid grid-cols-1">
            <div className="bg-base-200 p-4 rounded-lg">
                <h3 className=" font-medium text-lg">Консультационные листы</h3>
                <div className="flex items-center justify-between mb-4">
                    <div className="dropdown dropdown-right dropdown-end">
                        <div
                            tabIndex={0}
                            className=" cursor-pointer flex items-center"
                        >
                            <span className="mr-1 text-sm"> По диагнозу </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Item 2</a>
                            </li>
                            <li>
                                <a>Item 3</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <label className="cursor-pointer label">
                            <span className="text-sm mr-2">
                                Только мои осмотры
                            </span>
                            <input
                                type="checkbox"
                                checked={false}
                                className="checkbox"
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {appointments.map((appointment) => (
                        <AppointmentItem
                            onAppointmentClick={() =>
                                onAppointmentClick(appointment)
                            }
                            appointment={appointment}
                        ></AppointmentItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AppointmentItem = ({
    appointment,
    onAppointmentClick,
}: {
    appointment: AppointmentInfo;
    onAppointmentClick: (appointment: AppointmentInfo) => void;
}) => (
    <div
        onClick={() => onAppointmentClick(appointment)}
        className=" bg-white text-black p-4 rounded shadow-md"
    >
        <div className="flex flex-col items-start">
            <p className="font-medium mb-2">
                {appointment?.date &&
                    format(new Date(appointment?.date), "dd.MM.yyyy HH:mm")}
            </p>
            <div className="mb-4">
                <p className="text-dark-grey">Диагноз:</p>
                <div
                    dangerouslySetInnerHTML={{
                        __html: toCleanHtml(
                            appointment.diagnosis?.diagnose ?? "",
                        ),
                    }}
                />
            </div>
            <div>
                <p className="text-dark-grey">Врач:</p>
                <p>{appointment.doctorFullName}</p>
            </div>
        </div>
    </div>
);

export default AppointmentLists;
