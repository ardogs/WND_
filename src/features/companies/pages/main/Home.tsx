import { useMemo } from 'react'
import { ColumnsType } from '../../../../components/atoms/table/types'
import { AnimatedPage } from '../../../../components/layout'
import { Flex, Table } from '../../../../components/atoms'
import { TitleWithDescription } from '../../../../components/molecules'
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { useCompaniesStore } from '../../../../store/companies/useCompaniesStore'

interface DataType {
  key: string
  registrationNumber: string
  comercialName: string
  legalRepresentative: string
}

export const Home = () => {
  const companyData = useCompaniesStore((state) => state.companyData)

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: 'Número de registro',
        dataIndex: 'registrationNumber',
        key: 'registrationNumber',
      },
      {
        title: 'Nombre comercial',
        dataIndex: 'comercialName',
        key: 'comercialName',
        render: (text) => <span className="font-semibold text-foreground">{text}</span>,
      },
      {
        title: 'Representante Legal',
        dataIndex: 'legalRepresentative',
        key: 'legalRepresentative',
      },
      {
        title: 'Acciones',
        key: 'action',
        align: 'center',
        render: (_: unknown, record: DataType) => {
          const regNum = record?.registrationNumber || ''
          return (
            <Flex gap={16} justify="center">
              <Link to={`/companies/companiesForm/view/${regNum}`}>
                <AiOutlineEye
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base"
                  title="Ver detalles"
                />
              </Link>

              <Link to={`/companies/companiesForm/edit/${regNum}`}>
                <AiOutlineEdit
                  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors text-base"
                  title="Editar registro"
                />
              </Link>
            </Flex>
          )
        },
      },
    ],
    []
  )

  const data = useMemo(
    () =>
      companyData.map((item) => ({
        key: item.registration_number,
        registrationNumber: item.registration_number,
        comercialName: item.comercial_name,
        legalRepresentative: item.legal_representative,
      })),
    [companyData]
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Flex align="end" justify="space-between">
          <TitleWithDescription
            title="Mis Empresas"
            description="Gestiona y consulta las empresas y proveedores registrados"
          />
        </Flex>

        <div className="mt-4">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </AnimatedPage>
  )
}
