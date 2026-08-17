import { Select } from '../../../../../components/atoms'
import { DefaultOptionType } from '../../../../../components/atoms/select/types'
import { useSettings } from '../../../../../hooks'
import './styles.scss'

const option: DefaultOptionType[] = [
  { value: 'es', label: 'Español' },
  { value: 'kr', label: '한국어' },
  { value: 'en', label: 'English' },
]

export const LanguageSelect = () => {
  const { language, languageisLoading, handleLanguagueChange } = useSettings()

  return (
    <Select
      option={option}
      handleChange={handleLanguagueChange}
      defaultValue={language}
      loading={languageisLoading}
      className="language-select w-[200px]"
    />
  )
}
