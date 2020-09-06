import Vue from 'vue'
import IdleVue from 'idle-vue'
import Store from '../store'

const eventsHub = new Vue()

export default ({ Vue }) => {
  const options = {
    eventEmitter: eventsHub,
    idleTime: 1200000, // 20 minutes
    // idleTime: 10000, // 20 minutes
    Store,
    startAtIdle: true,
    events: ['keydown', 'mousemove', 'touchstart']
  }
  Vue.use(IdleVue, options)
}
