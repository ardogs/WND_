import { DatePicker as AntDatePicker, DatePickerProps } from "antd";

export const DatePicker = ({ ...rest }: DatePickerProps) => {
    return <AntDatePicker {...rest} style={{ width: "100%" }} />
}
