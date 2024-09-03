import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

createRoot(document.getElementById('root')!).render(
  <MantineProvider stylesTransform={emotionTransform}>
    <MantineEmotionProvider>
      <Notifications />
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineEmotionProvider>
  </MantineProvider>
)
