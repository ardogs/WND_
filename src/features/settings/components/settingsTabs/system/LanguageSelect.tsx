import { Select } from '../../../../../components/atoms'
import { DefaultOptionType } from '../../../../../components/atoms/select/types'
import { useSettings } from '../../../../../hooks'

const options: DefaultOptionType[] = [
  { value: 'es', label: 'Español' },
  { value: 'kr', label: '한국어' },
  { value: 'en', label: 'English' },
]

export const LanguageSelect = () => {
  const { language, languageisLoading, handleLanguagueChange } = useSettings()

  return (
    <Select
      option={options}
      handleChange={handleLanguagueChange}
      defaultValue={language}
      loading={languageisLoading}
      className="w-[200px]"
    />
  )
}
