import { Table as AntTable, TableProps } from 'antd'

export const Table = ({ ...rest }: TableProps) => {
    return (
        <AntTable {...rest} />
    )
}
