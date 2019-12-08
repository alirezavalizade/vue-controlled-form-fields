<template>
  <c-form :submit="onSubmit" :initial-values="{ experiences: [{ title: '' }] }">
    <div slot-scope="{ form, ...rest }">
      <field name="user.firstname" :validate="[required]">
        <input-text label="First Name" />
      </field>
      <field name="user.lastname" :validate="required">
        <input-text label="Last Name" />
      </field>
      <field name="user.email" :validate="[required, email]">
        <input-text label="Email" type="email" />
      </field>
      <field name="password" :validate="[required]">
        <input-text type="password" label="Password" />
      </field>
      <field
        name="confirm_password"
        :validate="[required, shouldBeMatchWith('password')]"
      >
        <input-text type="password" label="Confirm Password" />
      </field>
      <field name="bio" :validate="[]">
        <input-textarea label="Tell of you story..." />
      </field>
      <field name="city" :validate="[required]">
        <input-select label="City" :options="['karaj', 'tehran']" />
      </field>

      <field-array name="experiences">
        <a-row
          slot-scope="{ fields }"
          style="border: 1px solid #e5e5e5; padding: 20px;"
        >
          <a-row v-for="(name, i) in fields.map()" :key="name" :gutter="16">
            <a-col :span="24">
              <h2>Experience {{ i + 1 }}</h2>
            </a-col>
            <a-col :span="22">
              <field :name="`${name}.title`" :validate="[required]">
                <input-text label="Title" />
              </field>
              <field :name="`${name}.role`" :validate="[required]">
                <input-text label="Role" />
              </field>
            </a-col>
            <a-col :span="2">
              <a-button
                type="danger"
                icon="delete"
                @click="fields.remove(i)"
                size="small"
                shape="circle"
              />
            </a-col>
            <a-col :span="24" v-if="fields.map().length > 1">
              <hr
                style="display: block; height: 1px; border: 0; border-top: 1px solid #e5e5e5; margin: 1em 0; padding: 0;"
              />
            </a-col>
          </a-row>
          <a-button
            style="margin-bottom:0"
            type="primary"
            @click="fields.push({})"
            >Add more</a-button
          >
        </a-row>
      </field-array>

      <field name="agreement" :validate="[required]">
        <a-col :span="5" />
        <input-checkbox placeholder="I have read the agreement" />
      </field>
      <a-button
        type="primary"
        @click="form.handleSubmit"
        :disabled="rest.pristine"
        >Submit</a-button
      >
      <pre>
        {{ rest }}
      </pre>
    </div>
  </c-form>
</template>
<script>
import { Col, Row } from 'ant-design-vue';
import { Form as CForm, Field, FieldArray } from 'vue-controlled-form-fields';
import { required, email, shouldBeMatchWith } from '../../utils/validations';

// FORM INPUT COMPONENTS
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';
import InputSelect from './components/InputSelect';
import InputCheckbox from './components/InputCheckbox';
import Button from './components/Button';

export default {
  components: {
    CForm,
    Field,
    FieldArray,
    InputText,
    InputTextarea,
    InputSelect,
    InputCheckbox,
    AButton: Button,
    ACol: Col,
    ARow: Row
  },
  methods: {
    required,
    email,
    shouldBeMatchWith,
    onSubmit(v) {
      console.log(v);
    }
  }
};
</script>
