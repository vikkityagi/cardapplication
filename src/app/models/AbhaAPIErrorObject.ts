interface InnerErrorObject{
    message: string;
    code:string;
    attribute: string;
}
export interface AbhaAPIErrorObject {
    code: string;
    message: string;
    details: Array<InnerErrorObject>;
}
  