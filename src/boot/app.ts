import { boot } from 'quasar/wrappers';

import MDialog from 'components/dialog/MDialog.vue';
import MBtn from 'components/buttons/MBtn.vue';
import MTooltip from 'components/tooltips/MTooltip.vue';
import MDatePicker from 'components/form/MDatePicker.vue';

export default boot(({ app }) => {
  app.component('MBtn', MBtn);
  app.component('MTooltip', MTooltip);
  app.component('MDialog', MDialog);
  app.component('MDatePicker', MDatePicker);
});
