
// import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { TableProps } from "../../../../components/atoms/table/types";
import { AnimatedPage } from "../../../../components/layout";
import { Flex, Table } from "../../../../components/atoms";
import { TitleWithDescription } from "../../../../components/molecules";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useCompaniesStore } from "../../../../store/companies/useCompaniesStore";

interface DataType {
  key: string;
  registrationNumber: string;
  comercialName: string;
  legalRepresentative: string;
}

const columns: TableProps['columns'] = [
  {
    title: 'Número de registro',
    dataIndex: 'registrationNumber',
    key: 'registrationNumber',
  },
  {
    title: 'Nombre comercial',
    dataIndex: 'comercialName',
    key: 'comercialName',
  },
  {
    title: 'Representante Legal',
    dataIndex: 'legalRepresentative',
    key: 'legalRepresentative',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (record: DataType) => (

      <Flex gap={20}>
        <Link to={`companiesForm/view/${record.registrationNumber}`}>
          <AiOutlineEye style={{ cursor: 'pointer', }} title="Ver detalles" />
        </Link>

        <Link to={`companiesForm/edit/${record.registrationNumber}`}>
          <AiOutlineEdit style={{ cursor: 'pointer', }} title="Editar registro" />
        </Link>
      </Flex>
    ),

  },
];

export const Home = () => {

  const companyData = useCompaniesStore( state => state.companyData ) 
  const [data, setData] = useState<DataType[] | undefined>()


  useEffect(() => {
    const dataTable = companyData.map((item) => ({
      key: item.registration_number,
      registrationNumber: item.registration_number,
      comercialName: item.comercial_name,
      legalRepresentative: item.legal_representative,
    }));

    setData(dataTable)
  }, [companyData])

  return (
    <AnimatedPage>
      <div>
        <Flex align="end" justify="space-between">
          <TitleWithDescription title="¡Bienvenido!" description="Por favor, selecciona una opción para iniciar" />
        </Flex>

        <Outlet />
        <Table columns={columns} dataSource={data} pagination={false} style={{ marginTop: "50px", marginBottom: "60px" }} scroll={{ y: 500 }} />
      </div>
    </AnimatedPage>
  )
}
