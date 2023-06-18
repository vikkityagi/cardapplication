
export interface BenRegistrationApplication {
    id: number;
    application_type_code: number;
    applicationnumber: number;
    isDraft: boolean;
    isFinal: boolean;
    createdon:string;
    updatedon:string;
    esignStatus: boolean;
    esignedBy: string;
    esigned_on: string;
    pkcs7: string;
    parichayId: string;
  }