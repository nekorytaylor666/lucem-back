import React from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";

export const ReferenceForm: React.FC<SessionFormComponentProps> = () => {
    return (
        <FormAnimatedContainer>
            <div className="w-full bg-base-200 rounded-lg p-4">
                <h3 className="font-medium text-xl mb-4">Справки</h3>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Тип справки</span>
                    </label>
                    <select className="select select-bordered flex-grow border-transparent font-light mr-2">
                        <option disabled selected>
                            Не выбрано
                        </option>
                    </select>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
