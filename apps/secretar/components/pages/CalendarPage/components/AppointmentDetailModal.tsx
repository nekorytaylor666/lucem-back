import { getTemplate } from "@core/lib/events";
import { PatientEntity } from "@core/types/patient/IPatient";
import { EventContentArg } from "@fullcalendar/common";
import { BookingProgress } from "@graphqlTypes/globalTypes";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    ModalHeader,
    ModalContent,
} from "@chakra-ui/react";
import { EventDataDTO } from "../types/calendarTypes";

interface AppointmentDetailModalProps {
    active: boolean;
    eventData: EventDataDTO;
    onClose: () => void;
    onSessionStart: (eventData: EventDataDTO) => void;
    onSessionCancel: (eventData: EventDataDTO) => void;
}

export const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
    active,
    eventData,
    onClose,
    onSessionStart,
    onSessionCancel,
}) => {
    return (
        <Modal size="xl" isOpen={active} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Детали приема</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div>
                        <p>
                            {format(eventData.startDate, "dd.MM.yyyy hh:mm", {
                                locale: ru,
                            })}
                        </p>
                        <div className=" shadow-xl w-full flex items-center justify-between p-4 rounded-md mb-4">
                            <div className="flex items-center">
                                <div className="flex flex-col items-start">
                                    <p className="font-medium text-xl">
                                        {eventData.patient.fullName}
                                    </p>
                                    <p>{eventData.patient.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Link href={`/patients/${eventData.patient._id}`}>
                        <Button
                            colorScheme="purple"
                            onClick={() => {
                                onSessionStart(eventData);
                            }}
                            className=" py-2 mr-2 text-lg text-center"
                        >
                            Перейти к пациенту
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        colorScheme="purple"
                        onClick={() => onSessionCancel(eventData)}
                        className="text-lg "
                    >
                        Отменить прием
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
