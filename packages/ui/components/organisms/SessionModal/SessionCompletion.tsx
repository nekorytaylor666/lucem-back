import currentSessionFormState from "@recoil/atoms/currentSession";
import React from "react";
import { useRecoilState } from "recoil";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";

export const SessionCompletion: React.FC<SessionFormComponentProps> = () => {
  const [curSession, _] = useRecoilState(currentSessionFormState);
  return (
    <FormAnimatedContainer>
      <div className="w-full bg-base-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-xl mb-4">Заверешение приема</h3>
          <button className="btn btn-primary btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Печать
          </button>
        </div>
      </div>
    </FormAnimatedContainer>
  );
};
