import App from './App.vue'
import { createApp } from 'vue'
import { router } from '@/router'
import store from '@/store'

const forumApp = createApp(App)
forumApp.use(store)
forumApp.use(router)

/**
 * Registers a single component as global, making it available in other parts
 * of the application without having to import it.
 */
// forumApp.component('AppDate', AppDate)

/**
 * This block of code looks up every component with a specific filename prefix
 * and automatically registers it as a global component.
 */
const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(filename => {
  let baseComponentConfig = requireComponent(filename)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    filename.replace(/^.+\//, '').replace(/\.\w+$/, '')
  )

  forumApp.component(baseComponentName, baseComponentConfig)
})

forumApp.mount('#app')
