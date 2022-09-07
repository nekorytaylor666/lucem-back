import {
  Field,
  Form,
  Formik,
  FormikContext,
  useFormik,
  useFormikContext,
} from "formik";
import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";
import RichTextEditor from "components/atoms/RichTextEditor";

import { getDoctorTokens } from "../../../utils/getTokens";
import {
  useRadio,
  Box,
  useRadioGroup,
  HStack,
  Input,
  UnorderedList,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  Icd,
  MkbSearchQueryResult,
  useMkbSearchLazyQuery,
} from "@lucem/shared-gql";

export const DiagnosesForm: React.FC<SessionFormComponentProps> = ({
  formField,
}) => {
  const { token } = getDoctorTokens();
  const { diagnoses } = formField;
  const { values, handleChange, setFieldValue } = useFormikContext();

  const [getSearch, { loading, error, data }] = useMkbSearchLazyQuery();

  const options = [
    { label: "Предварительный", value: 1 },
    { label: "Окончательный", value: 0 },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "diagnose.preliminary",
    defaultValue: 1,
    onChange: (nextValue) => {
      setFieldValue("diagnose.preliminary", Number(nextValue));
    },
    value: values?.["diagnose"]?.["preliminary"],
  });

  const group = getRootProps();
  useEffect(() => {
    getSearch({
      variables: {
        search: values?.["diagnose"]?.["deseaseDBCode"],
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
  }, [values?.["diagnose"]?.["deseaseDBCode"]]);
  const mkbSearchResult = data?.searchICD;
  const onSearhResultClick = (mkbSearchResult: Icd) => {
    setFieldValue(
      "diagnose.deseaseDBCode",
      `${mkbSearchResult.code}: ${mkbSearchResult.description}`
    );
  };

  return (
    <FormAnimatedContainer>
      <div className="w-full bg-base-200 rounded-lg p-4">
        <div>
          <span className=" text-xs text-base-300">
            Изменено: {values?.diagnose?.doctor?.fullName}
          </span>
        </div>
        <h3 className="font-medium text-xl mb-4">Диагноз</h3>

        <HStack {...group}>
          {options.map(({ value, label }) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {label}
              </RadioCard>
            );
          })}
        </HStack>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Код по МКБ</span>
          </label>
          <Input
            size={"lg"}
            onChange={handleChange}
            value={values?.["diagnose"]?.["deseaseDBCode"]}
            name={"diagnose.deseaseDBCode"}
            className="input input-bordered flex-grow border-transparent font-light mr-2"
          ></Input>
          <List className="menu bg-base-100 w-full h-56 overflow-y-scroll mt-4">
            {mkbSearchResult?.map((el) => (
              <ListItem
                onClick={() => onSearhResultClick(el)}
                className={`${
                  `${el.code}: ${el.description}` ===
                    values?.["diagnose"]?.["deseaseDBCode"] && "active"
                } `}
              >
                <a>
                  {el.code}: {el.description}
                </a>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Развернутый клинический диагноз</span>
          </label>
          <Field
            name="diagnose.diagnose"
            className="textarea h-24"
            component={RichTextEditor}
          ></Field>
        </div>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Характер болезни</span>
          </label>
          <Field
            name="diagnose.natureOfTheDesease"
            className="textarea h-24"
            component={RichTextEditor}
          ></Field>
        </div>
      </div>
    </FormAnimatedContainer>
  );
};

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "purple.500",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
