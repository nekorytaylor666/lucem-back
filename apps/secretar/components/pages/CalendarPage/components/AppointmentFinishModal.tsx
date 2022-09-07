import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    ModalHeader,
    ModalContent,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import { EventDataDTO } from "../types/calendarTypes";
import {
    useEndSessionMutation,
    useGetActiveSessionQuery,
} from "@lucem/shared-gql";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getDoctorTokens } from "@lucem/ui/utils/getTokens";
import { GET_UPCOMING_BOOKINGS } from "@src/api/queries/getUpcomingBookings";

interface AppointmentFinishModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventData: EventDataDTO;
}

const AppointmentFinishModal = ({
    isOpen,
    onClose,
    eventData,
}: AppointmentFinishModalProps) => {
    const { token } = getDoctorTokens();
    const { data: activeSession, loading } = useGetActiveSessionQuery({
        variables: {
            userId: eventData?.patient?._id,
        },
        skip: !eventData?.patient?._id,
    });

    const session = activeSession?.getActiveSessionByUserId;
    const toast = useToast();
    const [endSession] = useEndSessionMutation({
        context: {
            // example of setting the headers with context per operation
            headers: {
                Authorization: token,
            },
        },
    });
    const onEndSession = async () => {
        await endSession({
            variables: {
                sessionId: session._id,
            },
            refetchQueries: [GET_UPCOMING_BOOKINGS],
        });
        toast({ status: "success", title: "Прием завершен" });
        onClose();
    };
    return (
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Текущий прием</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {session && (
                        <div>
                            <p>
                                {format(
                                    eventData?.startDate,
                                    "dd.MM.yyyy hh:mm",
                                    {
                                        locale: ru,
                                    },
                                )}
                            </p>
                            <div className=" shadow-xl w-full flex items-center justify-between p-4 rounded-md mb-4">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-start">
                                        <p className="font-medium text-xl">
                                            {eventData.patient.fullName}
                                        </p>
                                        <p>{eventData.patient.phoneNumber}</p>
                                        <p>{session.booking.service.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {loading && <Spinner></Spinner>}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onEndSession} colorScheme="purple" mr={3}>
                        Завершить прием
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Закрыть{" "}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AppointmentFinishModal;
