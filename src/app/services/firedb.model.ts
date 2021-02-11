
export interface VargaDetails {
    answerLink: string;
    answerText: string;
    questionText: string;
}

export interface AbhyasVarga {
    title: string;
    asset: string;
    acharya: string;
    date: string;
    description: string;
    details: VargaDetails[];
}