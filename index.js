import {h, render} from 'vue';
import Notification from './Components/Notifications.vue'
const createComponent = (props) => {
    const vNode = h(Notification, props)
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(vNode, container);
  
    return vNode.component
}

export default {
    install: (app, options) => {
        options = options || {};
        const notifications = createComponent(options.props ?? {});
        app.config.globalProperties.$notify = (message, options) => {
            options = options || {};
            notifications.data.notifications.push({
                message: message,
                action: options.action ?? {}
            });
            return message;
        }
    }
}