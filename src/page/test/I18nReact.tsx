import '@/i18n/index.react'
import { useTranslation } from "react-i18next";

export default function I18nReact() {

  const { t, i18n } = useTranslation()

  async function changeLocale() {
    if(i18n.language == 'ko') i18n.changeLanguage('en')
    else i18n.changeLanguage('ko')
  }

  return (
    <>
      <p>현재 언어: { i18n.language }</p>
      <p>{ t('test.message') }</p>
      <button type="button" onClick={ changeLocale }>언어변환</button>
    </>
  )

}