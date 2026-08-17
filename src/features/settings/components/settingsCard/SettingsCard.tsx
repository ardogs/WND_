import { TitleWithDescription } from '../../../../components/molecules'

interface Props {
  title: string
  description: string
  children: React.ReactNode
}

export const SettingsCard = ({ title, description, children }: Props) => {
  return (
    <div className="w-full max-w-[680px] min-h-[70px] bg-card text-card-foreground border border-border rounded-xl flex items-center justify-between p-4 sm:px-5 mb-4 gap-4 shadow-sm">
      <TitleWithDescription title={title} description={description} level={4} />
      {children}
    </div>
  )
}
