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
