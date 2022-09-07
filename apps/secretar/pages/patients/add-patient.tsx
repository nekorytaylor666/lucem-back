import ParentMultistepForm from "components/organisms/AddDoctorMultistepForm/AddDoctorParentMultistepForm";

const AddDoctorPage = () => {
    return (
        <div>
            <div className="text-sm breadcrumbs text-base-300">
                <ul>
                    <li>
                        <a>Все пациенты</a>
                    </li>
                    <li>
                        <a>Добавление пациента</a>
                    </li>
                </ul>
            </div>
            <div>
                <p className="text-4xl font-bold">Добавление пациента</p>
            </div>
            <ParentMultistepForm></ParentMultistepForm>
        </div>
    );
};

export default AddDoctorPage;
