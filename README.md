<div align="center">
  <h1>
    <br/>
    <br/>
    🙌
    <br />
    vue-controlled-form-fields
    <br />
    <br />
    <br />
  </h1>

[![NPM Version](https://img.shields.io/npm/v/vue-controlled-form-fields.svg?style=flat)](https://www.npmjs.com/package/vue-controlled-form-fields)
![npm](https://img.shields.io/npm/dw/vue-controlled-form-fields)
[![Build Status](https://travis-ci.com/alirezavalizade/vue-controlled-form-fields.svg?token=h4WVYN9AxSAEz9ZViSGz&branch=master)](https://travis-ci.com/alirezavalizade/vue-controlled-form-fields)
[![codecov](https://codecov.io/gh/alirezavalizade/vue-controlled-form-fields/branch/master/graph/badge.svg?token=vrLCyAepmW)](https://codecov.io/gh/alirezavalizade/vue-controlled-form-fields)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Greenkeeper badge](https://badges.greenkeeper.io/alirezavalizade/vue-controlled-form-fields.svg?token=6c55ea430e85829bf7a100e95c49af7fa4f276d5d37f784029e77d0847347848&ts=1575547459931)](https://greenkeeper.io/)

  <br />
  <br />
  <br />
  <br />
  <pre>yarn add <a href="https://www.npmjs.com/package/vue-controlled-form-fields">vue-controlled-form-fields</a></pre>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>

`vue-controlled-form-fields` is a flexible and hight-performance state-managament tool for creating different level of forms.

- [**`<Form />`**](./docs/api/Form.md)
  - [Documents](./docs/api/Form.md)
  - [Examples]()
- [**`<Field />`**](./docs/api/Field.md)
  - [Documents](./docs/api/Field.md)
  - [Examples]()
- [**<FieldArray />**](./docs/api/FieldArray.md)
  - [Documents](./docs/api/FieldArray.md)
  - [Examples]()
- [**FieldStateMixin**](./docs/api/FieldStateMixin.md)
  - [Documents](./docs/api/FieldStateMixin.md)
  - [Examples]()

```vue
<c-form :submit="onSubmit">
   <div slot-scope="{pristine, invalid}">
    <h2>Simple Default Input</h2>
    <div>
      <label>First Name</label>
      <field name="firstName" component="input" placeholder="First Name"/>
    </div>

    <h2>A Reusable Input Component</h2>
    <div>
      <label>Interests</label>
      <field name="interests">
        <InterestPicker/>
      </field>
    </div>

    <h2>Using slot-scope</h2>
    <field name="bio">
      <div slot-scope="{events, meta, name, value}">
        <div>
          <label>Bio</label>
          <textarea v-on="events" v-bind="{name, value}"/>
          <span v-if="meta.touched && meta.error">{{ meta.error }}</span>
        </div>
      </div>
    </field>

    <button type="submit" :disabled="pristine || invalid">Submit</button>
  </div>
</c-form>
```
