//--CONTROLLER MODULE----

import {dataModule} from './data-module';
import {userInterfaceModule} from './ui-module';

(function(UImodule, userDataModule) {
  UImodule.submitButton.addEventListener('click', function() {
    try {
      let object = userDataModule.getData();
      if (object === undefined) {
        throw new Error('Cannot create PDF');
      } else {
        userDataModule.sendToAPI(object);
        UImodule.setElementAsVisible(UImodule.confirmation);
      }
    } catch (e) {
      console.log(e);
    }
  });
})(userInterfaceModule, dataModule);
