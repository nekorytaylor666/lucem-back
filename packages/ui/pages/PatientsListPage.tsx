import Link from "next/link";

import { User } from "@lucem/shared-gql";
import { ElevatedContainer } from "../components/atoms/ElevatedContainer";
import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export const PatientsPageComponent: React.FC<{
  patients: Partial<User>[];
  onPatientAdd: () => void;
}> = ({ patients, onPatientAdd }) => {
  const [searchName, setSearchName] = useState("");
  let filteredPatiens = patients;
  const re = new RegExp(searchName + ".+$", "i");
  filteredPatiens = filteredPatiens?.filter(function (e, i, a) {
    return e.fullName.search(re) != -1;
  });
  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4">Пациенты</h1>
        <div className=" flex   mb-4">
          <input
            onChange={(e) => setSearchName(e.target.value)}
            type="text"
            value={searchName}
            placeholder="Поиск"
            className="input w-64 bg-base-200 mr-4"
          />
          {!!onPatientAdd && (
            // <Link href="/patients/add-patient">
            <Button onClick={onPatientAdd} variant={"outline"} h="full">
              Добавить пациента
            </Button>
            // </Link>
          )}
        </div>
      </div>
      <div className="w-full border-b-2 border-base-200 mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {filteredPatiens.map((patient) => (
          <PatientCard key={patient?._id} patient={patient}></PatientCard>
        ))}
      </div>
    </div>
  );
};

const PatientCard: React.FC<{ patient: User }> = ({ patient }) => {
  return (
    <ElevatedContainer className="rounded-lg p-4 h-full">
      <div className="flex items-center ">
        <Link href={`/patients/${patient?._id}`}>
          <div className=" cursor-pointer  mr-4">
            <Avatar
              size="lg"
              bg="primary"
              color={"white"}
              name={patient.fullName}
            />
          </div>
        </Link>

        <div className="flex flex-col justify-start">
          <Link href={`/patients/${patient?._id}`}>
            <Text className=" text-xl font-semibold cursor-pointer">
              {patient.fullName}
            </Text>
          </Link>

          <a href={`tel: ${patient.phoneNumber}`} className="text-base-300">
            Телефон: +{patient.phoneNumber}
          </a>
        </div>
      </div>
    </ElevatedContainer>
  );
};
