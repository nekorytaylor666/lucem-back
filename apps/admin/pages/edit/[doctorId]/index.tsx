import ParentMultistepForm from "components/organisms/AddDoctorMultistepForm/AddDoctorParentMultistepForm";
import EditDoctorParentMultistepForm from "components/organisms/AddDoctorMultistepForm/EditDoctorParentForm";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GetDoctorByID} from "../../../graphql/query/getDoctorById/__generated__/GetDoctorById";
import {GET_DOCTOR_BY_ID} from "../../../graphql/query";

const EditDoctorPage = () => {
    const router = useRouter();
    const doctorId = router.query.doctorId as string;
    const { data, loading } = useQuery<GetDoctorByID>(GET_DOCTOR_BY_ID, {
        variables: { id: doctorId },
    });
    const [doctorInfo, setDoctorInfo] = useState({} as GetDoctorByID);

    useEffect(() => {
        if (data) {
            setDoctorInfo(data.getDoctorByID);
            console.log(data.getDoctorByID);
        }
    }, [data]);

    return (
        <div>
            <div className="text-sm breadcrumbs text-base-300">
                <ul>
                    <li>
                        <a>Все сотрудники</a>
                    </li>
                    <li>
                        <a href={`/staff/${doctorInfo?._id}/doctor`}>{doctorInfo?.fullName}</a>
                    </li>
                </ul>
            </div>
            <div>
                <p className="text-4xl font-bold">Редактирование врача</p>
            </div>
            <EditDoctorParentMultistepForm
                doctorId={doctorId ?? ""}
            ></EditDoctorParentMultistepForm>
        </div>
    );
};

export default EditDoctorPage;
