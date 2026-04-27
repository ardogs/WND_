import { Flex, Title } from "../../../../components/atoms"
import { AnimatedPage } from "../../../../components/layout"
import { TitleWithDescription } from '../../../../components/molecules/titleWithDescription/TitleWithDescription';
import { Button } from '../../../../components/atoms/button/Button';

import { Space, Table, TableProps, Tag } from 'antd';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { Link, Outlet } from 'react-router-dom';



interface DataType {
  key: string;
  company: string;
  customer: number;
  date: string;
  price: number;

}

const columns: TableProps<DataType>['columns'] = [
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
    render: (_, record) => (
      <Space size="small">
        <AiOutlineEye />
        <AiOutlineEdit />
        <AiOutlineDelete />
      </Space>
    ),
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
  {
    key: '6',
    company: 'John Brown',
    customer: 32,
    date: 'New York No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '7',
    company: 'Jim Green',
    customer: 42,
    date: 'London No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '8',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '9',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },
  {
    key: '10',
    company: 'Joe Black',
    customer: 32,
    date: 'Sydney No. 1 Lake Park',
    price: 100000,
  },
];

export const Home = () => {
  return (
    <AnimatedPage>
      <div >
        <Flex align="end" justify="space-between">
          <TitleWithDescription title="¡Bienvenido!" description="Por favor, selecciona una opción para iniciar" />

          <Link to="new" > <Button  size="middle" type="primary" text="Nueva Cotización" /></Link>
        </Flex>

        <Outlet />
        <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} style={{ marginTop: "50px", marginBottom: "60px" }} scroll={{ y: 500 }} />
      </div>
    </AnimatedPage>
  )
}
