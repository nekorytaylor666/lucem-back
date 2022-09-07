import { SpecializationEntity } from "@core/types/specializations/ISpecialization";

export default class SpecializationModel implements SpecializationEntity {
    accentColor: string;
    description: string;
    imageUrl: string;
    slug: string;
    title: string;

    constructor(
        accentColor: string,
        description: string,
        imageUrl: string,
        slug: string,
        title: string,
    ) {
        this.accentColor = accentColor;
        this.description = description;
        this.imageUrl = imageUrl;
        this.slug = slug;
        this.title = title;
    }
}
