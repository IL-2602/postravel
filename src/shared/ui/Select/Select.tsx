import React, { ReactElement, useState } from 'react'

import { SelectToggle } from '@/shared/assets/icons/SelectToggle'
import { Typography } from '@/shared/ui/Typography'
import * as Select from '@radix-ui/react-select'

import s from './Select.module.scss'

type LanguageSelectItem = {
  icon?: ReactElement
  title: string
}

type SelectPropsType = {
  currentValue?: LanguageSelectItem
  fullWidth?: boolean
  onValueChange?: (value: string) => void
  optionTextVariant?:
    | 'bold-small'
    | 'bold14'
    | 'bold16'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link-small'
    | 'medium14'
    | 'regular-link'
    | 'regular14'
    | 'regular16'
    | 'small'
  selectItems: Array<LanguageSelectItem>
  values?: Array<string>
}

export const SelectComponent = ({
  currentValue,
  fullWidth,
  onValueChange,
  optionTextVariant = 'regular14',
  selectItems,
}: SelectPropsType) => {
  const [value, setValue] = useState(selectItems[0])
  const localCurrentValue = currentValue ? currentValue : value
  const localOnValueChange = onValueChange ? onValueChange : setValue

  const handleValueChange = (title: string) => {
    const el = selectItems.find(el => el.title === title)

    if (el) {
      setValue(el)
      if (onValueChange) {
        onValueChange(el.title)
      }
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Select.Root
      onOpenChange={() => setIsOpen(prevState => !prevState)}
      onValueChange={handleValueChange}
      open={isOpen}
      value={localCurrentValue.title}
    >
      <Select.Trigger
        className={`${s.selectTrigger} ${fullWidth ? s.fullWidth : ''}`}
        value={localCurrentValue.title}
      >
        {selectItems[0].icon && <Select.Icon>{localCurrentValue.icon}</Select.Icon>}
        <Select.Value />
        <Select.Icon className={s.arrow}>
          <SelectToggle className={isOpen ? s.arrowDown : ''} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className={s.selectContent} position={'popper'}>
        {selectItems?.map(el => {
          return (
            <Select.Item className={s.selectItem} key={el.title} value={el.title}>
              {el.icon && <Select.Icon>{el.icon}</Select.Icon>}
              <Select.ItemText>
                <Typography variant={optionTextVariant}>{el.title}</Typography>
              </Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
