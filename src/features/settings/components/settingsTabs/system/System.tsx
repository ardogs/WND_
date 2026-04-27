import { SettingsCard } from '../../settingsCard'
import { DarkModeSwitch } from './DarkModeSwitch';
import { LanguageSelect } from './LanguageSelect';
import { FontSizeSlider } from './FontSizeSlider';



export const System = () => {



  return (
    <div>
      <SettingsCard title='Tema' description='Selecciona  entre un tema y claro y oscuro'>
        <DarkModeSwitch />
      </SettingsCard>

      <SettingsCard title='Tamaño de la fuente' description='Cambia el tamaño de fuente del sistema'>
        {/* <Slider min={15} max={20} style={{ height: "30px" }} value={typeof inputValue === 'number' ? inputValue : 0}/> */}
        <FontSizeSlider/>
      </SettingsCard>

      <SettingsCard title='Idioma' description='Selecciona entre 3 idiomas disponibles: Ingles, Coreano y español'>
        <LanguageSelect/>
      </SettingsCard>


    </div>
  )
}
