export class TablePrimeColumOptions {
    field?: string = '';
    header?: string = '';
    subField?: string;
    width?: string;
    align?: string;
    booleanField?: boolean = false;
    dateField?: boolean = false;
    datePipe?: string;
    currencyField?: boolean = false;
    buttonField?: boolean = false;
    iconButton?: string;
    command?: (data) => void;
    separator?: string;
    concatenateField?: string;
    concatenateSubField?: string;
    tooltip?: string;
    isUserInRule?: string;
}