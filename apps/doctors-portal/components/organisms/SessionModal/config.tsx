import React from "react";
import { CuringPlanForm } from "./CuringPlanForm";
import { DiagnosesForm } from "./DiagnosesForm";
import { GeneralReviewForm } from "./GeneralReviewForm";
import { IllnessReason } from "./IllnessReason";
import { ReferenceForm } from "./ReferenceForm";
import { ResearchResultForm } from "./ResearchResultForm";
import { SessionCompletion } from "./SessionCompletion";
import { checkoutFormModel } from "./shared/checkoutFormModel";
const { formField } = checkoutFormModel;
export const sessionSteps = [
    {
        index: 0,
        id: "ill-reason",
        label: "Жалобы и анамнез заболевания",
        formComponent: <IllnessReason formField={formField}></IllnessReason>,
    },
    {
        index: 1,
        id: "general-review",
        label: "Осмотр",
        formComponent: (
            <GeneralReviewForm formField={formField}></GeneralReviewForm>
        ),
    },

    {
        index: 2,
        id: "diagnoses",
        label: "Диагноз",
        formComponent: <DiagnosesForm formField={formField}></DiagnosesForm>,
    },
    {
        index: 3,
        id: "curing-plan",
        label: "Назначения",
        formComponent: <CuringPlanForm formField={formField}></CuringPlanForm>,
    },
];
export const renderSessionFormStep = (index: number): JSX.Element | null => {
    return (
        sessionSteps.find((step) => step.index === index)?.formComponent ?? null
    );
};
