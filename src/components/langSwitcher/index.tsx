/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { withTranslation } from 'react-i18next';
import { languages } from '../../constants.json';

const { Option } = Select;

const LangSwitcher = ({ t, i18n }) => {
  function handleChange(value) {
    i18n.changeLanguage(value);
  }

  return (
    <div>
      {`${t('app.settings.language')} `}
      <Select
        defaultValue={t(`app.languages.${i18n.language}`)}
        onChange={handleChange}
      >
        {languages.map((lang) => {
          return (
            <Option value={lang} key={`lang-${lang}`}>
              {t(`app.languages.${lang}`)}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default withTranslation()(LangSwitcher);
