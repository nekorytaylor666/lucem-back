import client from "src/apollo/apollo-client";
import gql from "graphql-tag";
import { Booking } from "@core/types/bookings/IBookings";
import { Session } from "@core/types/session/ISession";
import { GET_ACTIVE_SESSION_PATIENT } from "../queries/getActiveSession";

export const START_SESSION_MUTATION = gql`
    mutation StartSesison($bookingId: String!) {
        startSession(bookingId: $bookingId) {
            _id
        }
    }
`;
export const END_SESSION_MUTATION = gql`
    mutation EndSession($sessionId: String!) {
        endSession(sessionId: $sessionId) {
            _id
        }
    }
`;

interface StartSessionRes {
    startSession: Session;
}

export const startSessionMutation = async (
    variables: { bookingId: string },
    { token }: { token: string },
): Promise<Session | undefined> => {
    const { data } = await client.mutate<StartSessionRes>({
        mutation: START_SESSION_MUTATION,
        variables,
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data?.startSession;
    return res;
};
export const endSessionMutation = async (
    variables: { sessionId: string },
    { token }: { token: string },
): Promise<Session | undefined> => {
    const { data } = await client.mutate<any>({
        mutation: END_SESSION_MUTATION,
        variables,
        context: {
            headers: {
                Authorization: token,
            },
        },
        refetchQueries: [GET_ACTIVE_SESSION_PATIENT],
    });
    const res = data?.endSession;
    return res;
};

export const UPLOAD_SESSION_BLANK = gql`
    mutation UploadSessionBlank(
        $complaint: CreateComplaint!
        $diagnose: CreateDiagnose!
        $inspections: CreateInspections!
        $sessionId: String!
        $appointmentResults: CreateAppointmentResults
    ) {
        createSessionBlank(
            complaint: $complaint
            diagnose: $diagnose
            inspections: $inspections
            sessionId: $sessionId
            appointmentResults: $appointmentResults
        ) {
            __typename
        }
    }
`;

interface UploadSessionArguments {
    appointmentResults: {
        description: string;
    };
    complaints: {
        complaint: string;
        reason: string;
        sicknessTimeDuration: string;
    };
    diagnose: {
        deseaseDBCode: string;
        diagnose: string;
        natureOfTheDesease: string;
        preliminary: boolean;
    };
    inspections: string[];
}

interface UploadSessionResponse {
    createSessionBlank: { __typename: string[] };
}

export const uploadSessionBlank = async (
    {
        session,
        sessionId,
    }: { session: UploadSessionArguments; sessionId: string },
    { token }: { token: string },
): Promise<{ __typename: string[] } | undefined> => {
    const { data } = await client.mutate<UploadSessionResponse>({
        mutation: UPLOAD_SESSION_BLANK,
        variables: { ...session, sessionId },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data?.createSessionBlank;
    return res;
};
