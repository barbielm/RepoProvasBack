export interface ProfessorStruct{
    name: string;
    disciplineId: number;
}


export interface CategoryStruct{
    name: string;
}


export interface DisciplineStruct{
    name: string;
    semester: string;
}

export interface TestStruct{
    name: string;
    categoryName: string;
    professorId: number;
    disciplineId: number;
    pdf: string;
}