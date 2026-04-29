import { Flex } from '../../atoms';
import { CompanyDocumentCard } from './CompanyDocumentCard'
import { CompanyDetailsForm } from './CompanyDetailsForm';
import { useCompanies } from '../../../hooks';
import { companyDataSelectorMode } from '../../../features/companies/types';
// import { companyDataSelectorMode } from './types';

interface Props {
    mode: companyDataSelectorMode,
    defaultValue?: string
}



export const CompanyDataSelector = ({ mode, defaultValue }: Props) => {
    const { getSelectOptions, registration_number_id,onCompanyChange, companyData,...rest } = useCompanies();


    const data = companyData.find( element => element.registration_number === registration_number_id )
    const handleDafultValue = () => (defaultValue === undefined) ? registration_number_id : defaultValue ;


    return (
        <Flex justify='center'>
            { (registration_number_id || defaultValue) && <CompanyDocumentCard option={getSelectOptions} defaultValue={handleDafultValue()} img={data?.img || "null"} onChangeSelect={onCompanyChange} mode={mode} />}
            <CompanyDetailsForm mode={mode} {...rest} />
        </Flex>
    )
}
