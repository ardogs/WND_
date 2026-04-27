import { Card } from '../../../../components/atoms';
import { Link } from 'react-router-dom';
import "./styles.scss";


type link = 'quotations' | 'invoices' | 'companies' | 'settings';
interface Props {
    linkTo: link,
    title: string

}
export const LinkCard = ({ linkTo, title }: Props) => {
    return (
        <Link to={linkTo} className=''>
            <Card title={title} />
        </Link>
    )
}
