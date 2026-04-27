
import type { DefaultOptionType } from '../../atoms/select/types'
import { companyDataSelectorMode } from './types';
import { Select, Image } from '../../atoms'
import { useTheme } from '../../../hooks';
import "./styles.scss";

interface Props {
    option: DefaultOptionType[]
    defaultValue: string
    img: string
    mode: companyDataSelectorMode
    onChangeSelect: (data: string) => void,
}

export const CompanyDocumentCard = ({ defaultValue, img, option, onChangeSelect, mode }: Props) => {

    const { colorBgBase } = useTheme();

    return (
        <div className='company-card company-card-document ' style={{ backgroundColor: colorBgBase }}>

            <div className='company-card-document-select'>
                <Select option={option} defaultValue={defaultValue} handleChange={onChangeSelect} disabled={ mode !== 'default' ? true : false  }/>
            </div>

            <div className='company-card-document-img'>
                <Image src={img} width={425} alt="" preview/>
            </div>
        </div>
    )
}
