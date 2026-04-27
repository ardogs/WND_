import { Switch as AntSwitch } from 'antd'
import { SwitchChangeEventHandler, SwitchProps } from 'antd/es/switch'
import { ReactNode } from 'react'

interface Props extends SwitchProps {
    loading: boolean,
    isChecked: boolean,
    handleOnChange: SwitchChangeEventHandler,
    checkedChildren: ReactNode
    unCheckedChildren: ReactNode
}

export const Switch = ({ loading, isChecked, handleOnChange, checkedChildren, unCheckedChildren, ...rest }: Props) => {
    return (
        <AntSwitch loading={loading} checked={isChecked} onChange={handleOnChange} checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} {...rest} />
    )
}


