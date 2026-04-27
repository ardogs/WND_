import { useTranslation } from 'react-i18next';
import { Flex, Table, Title, Divider } from '../../components/atoms';
import { TitleWithDescription } from "../../components/molecules";
import { LinkCard } from "./components/linkCard/LinkCard";
import { AnimatedPage } from "../../components/layout"
import { TableProps } from "../../components/atoms/table/types";

interface DataType {
  key: string;
  company: string;
  customer: number;
  date: string;
  price: number;

}


const columns: TableProps['columns'] = [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cliente',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Precio Total',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'Actions',
    key: 'action',
    // render: (_, record) => (
    //   <Space size="small">
    //     <AiOutlineEye />
    //     <AiOutlineEdit />
    //     <AiOutlineDelete />
    //   </Space>
    // ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    company: 'John Brown',
    customer: 32,
    date: 'New York No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '2',
    company: 'Jim Green',
    customer: 42,
    date: 'London No. 1 Lake Park',
    price: 10000,
  },
  {
    key: '3',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '4',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '5',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },

];


export const Home = () => {
  const { t } = useTranslation('home');

  return (
    <AnimatedPage>
      <Title level={1} text={t('title')} />
      <div >
        <TitleWithDescription title="¡Bienvenido!" description="Por favor, selecciona una opcion para inciar" />

        <Flex gap={30} style={{ marginTop: 25, marginBottom: 25 }}>
          <LinkCard linkTo="quotations" title="Cotizaciones"/>
          <LinkCard linkTo="invoices" title="Facturación"/>
          <LinkCard linkTo="companies" title="Mis empresas"/>
        </Flex>

        <Divider />
        <TitleWithDescription title="Últimos documentos creados" description="Selecciona un documento para editarlo o eliminarlo" />
        <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} style={{ marginTop: 15 }}  />


      </div>
    </AnimatedPage>
  )
}
