<script>
import { FieldStateMixin } from 'vue-controlled-form-fields';
import InputItem from './InputItem';

export default {
  components: {
    InputItem
  },
  mixins: [FieldStateMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
};
</script>
