import { Flex } from '../../atoms';
import { CompanyDocumentCard } from './CompanyDocumentCard'
import { CompanyDetailsForm } from './CompanyDetailsForm';
import { useCompanies } from '../../../hooks';
import { companyDataSelectorMode } from './types';

interface Props {
    mode: companyDataSelectorMode,
    defaultValue?: string
}



export const CompanyDataSelector = ({ mode, defaultValue }: Props) => {
    const { getSelectOptions, img, onCompanyChange, registration_number, companyData,...rest } = useCompanies();
    const handleDafultValue = () => (defaultValue === undefined) ? companyData[0].registration_number : defaultValue ;

    return (
        <Flex justify='center'>
            { (registration_number || defaultValue) && <CompanyDocumentCard option={getSelectOptions()} defaultValue={handleDafultValue()} img={img} onChangeSelect={onCompanyChange} mode={mode} />}
            <CompanyDetailsForm mode={mode} {...rest} />
        </Flex>
    )
}
