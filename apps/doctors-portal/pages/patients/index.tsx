import getAdminLayout from "components/layouts/adminLayout";
import React, { useEffect } from "react";

import { PatientsPageComponent } from "@lucem/ui";
import { useGetAllUsersQuery } from "@lucem/shared-gql";
import { useRouter } from "next/router";
import { Center, Container, Spinner } from "@chakra-ui/react";
const PatientsPage: React.FC = () => {
    const { data, loading } = useGetAllUsersQuery();
    if (loading) {
        return (
            <Container>
                <Center>
                    <Spinner></Spinner>
                </Center>
            </Container>
        );
    }
    const patients = data?.listUsers;
    return (
        <PatientsPageComponent
            patients={patients ?? []}
        ></PatientsPageComponent>
    );
};

export default PatientsPage;
