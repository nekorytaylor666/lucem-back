import ParentMultistepForm from "components/organisms/AddDoctorMultistepForm/AddDoctorParentMultistepForm";

const AddDoctorPage = () => {
    return (
        <div>
            <div className="text-sm breadcrumbs text-base-300">
                <ul>
                    <li>
                        <a>Все сотрудники</a>
                    </li>
                    <li>
                        <a>Добавление врача</a>
                    </li>
                </ul>
            </div>
            <div>
                <p className="text-4xl font-bold">Добавление врача</p>
            </div>
            <ParentMultistepForm></ParentMultistepForm>
        </div>
    );
};

export default AddDoctorPage;
