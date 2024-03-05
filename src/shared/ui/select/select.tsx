import { useState } from 'react'

import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectToggle } from '../../assets/icons/select-toggle/selectToggle'
import { Typography } from '../typography/typography'

type SelectPropsType = {
  currentValue?: string
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
  selectItems?: Array<string>
  values?: Array<string>
}

const defaultSelectItems = ['select1', 'select2', 'select3']

export const SelectComponent = ({
  currentValue,
  fullWidth,
  onValueChange,
  optionTextVariant = 'regular14',
  selectItems = defaultSelectItems,
}: SelectPropsType) => {
  const [value, setValue] = useState(selectItems[0])
  const localCurrentValue = currentValue ? currentValue : value
  const localOnValueChange = onValueChange ? onValueChange : setValue

  return (
    <Select.Root onValueChange={localOnValueChange} value={localCurrentValue}>
      <Select.Trigger className={`${s.selectTrigger} ${fullWidth ? s.fullWidth : ''}`}>
        <Select.Value defaultValue={localCurrentValue}>
          <Typography variant={optionTextVariant}>{localCurrentValue}</Typography>
        </Select.Value>
        <Select.Icon>
          <SelectToggle />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className={s.selectContent} position={'popper'}>
        {selectItems?.map((el, i) => {
          return (
            <Select.Item className={s.selectItem} key={i} value={el}>
              <Select.ItemText>
                <Typography variant={optionTextVariant}>{el}</Typography>
              </Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
