import { shallow as enzymeShallow } from 'enzyme';
import { CHANNEL } from '@material-ui/core/styles/themeListener';
import appContext from './context';

// Generate an enhanced shallow function.
export default function createShallow(options1 = {}) {
  const { shallow = enzymeShallow, dive = false, ...other1 } = options1;

  const shallowWithContext = function shallowWithContext(node, options2 = {}) {
    const options = {
      ...other1,
      ...options2,
      context: {
        ...other1.context,
        ...options2.context,
        [CHANNEL]: {
          getState: () => {
            return appContext.theme;
          },
          subscribe: () => {

          },
          unsubscribe: () => {

          },
        },
      },
    };

    const wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    return wrapper;
  };

  return shallowWithContext;
}
