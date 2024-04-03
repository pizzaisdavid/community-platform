import {
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from 'oa-components'
import { Card } from 'theme-ui'

import { SettingsForm } from './SettingsForm'
import { SettingsMapForm } from './SettingsMapForm'

interface IProps {
  /** user ID for lookup when editing another user as admin */
  adminEditableUserId?: string
}

export const SettingsContainer = ({ adminEditableUserId }: IProps) => {

  const cardStyle = {
    marginTop: 2,
    padding: 2
  }
  return (
    <Card sx={cardStyle}>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab>Settings</Tab>
          <Tab>Map</Tab>
        </TabsList>
        <TabPanel>
          <SettingsForm adminEditableUserId={adminEditableUserId} />
        </TabPanel>
        <TabPanel>
          <SettingsMapForm />
        </TabPanel>
      </Tabs>
    </Card>
  )
}