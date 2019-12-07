# `<Field />`

```js
import { Field } from 'vue-controlled-form-fields';
```

**Field is a reactive and subscription-based, injector and also provider. Field can be used in 3 different ways.**

## Usage

#### 1. Native components

```js
<c-form :submit="onSubmit">
    <div>
      <label>Simple Default Input</label>
      <field
        :validate="required"
        name="user.name"
        component="input"
        type="text"
        placeholder="username"
      />
    </div>
    <div>
      <label>Boolean Checkbox</label>
      <field name="vegetarian" component="checkbox" />
    </div>
    <div>
      <label
        >Multi Checkboxes (The value will be array of selected
        checkboxes)</label
      >
      <field
        name="foods"
        component="input"
        type="checkbox"
        value="chicken 🐥"
      />
      <field
        name="foods"
        component="input"
        type="checkbox"
        value="Fesenjoon 🥜"
      />
      <field
        name="foods"
        component="input"
        type="checkbox"
        value="Ghormesabzi 😍"
      />
      <field name="foods" component="input" type="checkbox" value="Gheyme 🐄" />
    </div>
    <div>
      <label>Radio</label>
      <field name="gender" component="input" type="radio" value="male 👨‍💼" />
      <field name="gender" component="input" type="radio" value="female 👩‍🔧" />
    </div>
    <div>
      <label>Select</label>
      <field component="select" name="country">
        <option>select</option>
        <option value="australia">Australia</option>
        <option value="canada">Canada</option>
        <option value="usa">USA</option>
      </field>
    </div>
    <div>
      <label>Multiple select</label>
      <field component="select" name="nationality" multiple>
        <option>select</option>
        <option value="australia">Australia</option>
        <option value="canada">Canada</option>
        <option value="usa">USA</option>
      </field>
    </div>
    <div>
      <label>Textarea</label>
      <field component="story" name="subject" placeholder="Write something.." />
    </div>
</c-form>
```

For showing validation errors you can use form's state using `slot-scope`, like this:

```js
<c-form>
	<div slot-scope="{ errors, visitedFields }">
	   <div>
          <label>Simple Default Input</label>
          <field
          	:validate="required"
            name="user.name"
            component="input"
            type="text"
            placeholder="username"
          />
          <span v-if="errors.user.name && visitedFields['user.name']">
          	{{ errors.user.name }}
          </span>
      </div>
    </div>
</c-form>
```

#### 2. Custom Native components

You can create your own native components. You can access to field state using
`slot-scope="fieldState"`.

```js
 <c-form>
    <div slot-scope="{ errors, visitedFields }">
      <div>
        <label>Simple Default Input</label>
        <field
          :validate="required"
          name="user.name"
          component="input"
          type="text"
          placeholder="username"
        />
        <span v-if="errors.user.name && visitedFields['user.name']">
          {{ errors.user.name }}
        </span>
      </div>
    </div>
</c-form>
```

#### 2. Custom and reusable components

You can create reusable components in separate file, for accessing to field state in another component you need to use `FieldStateMixin`. By using this mixin you can access to field state inside your component context or in template. (`this.field`)

```vue
//**** InputText.vue *******
<template>
  <div>
    <label>
      {{ label }}
      <input
        :disabled="disabled"
        :type="type"
        :placeholder="placeholder"
        :value="field.value"
        v-on="field.events"
      />
      <span v-if="field.touched && field.error">{{ field.error }}</span>
    </label>
  </div>
</template>

<script>
import { FieldStateMixin } from 'vue-controlled-form-fields';

export default {
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
```

And then you can use it every where like this:

```vue
// In you form
<template>
  <c-form :submit="onSubmit">
    <field name="user.email" :validate="[required, email]">
      <input-text type="email" placeholder="email" />
    </field>
  </c-form>
</template>

<script>
import InputText from './InputText';

export default {
  components: {
    InputText
  }
};
</script>
```

You can also use third party libraries here. like antd or material design. You can find more examples `here`.

## Field `:props`

<table>
<thead>
<tr>
<th style="text-align:left">Properties</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Example</th>
</tr>
</thead>
<tbody>

<tr>
<td style="text-align:left">name</td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>required</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
name of the field. for having nested values you should use object notation.
<code>name="user.username"</code>
</td>
</tr>

<tr>
<td style="text-align:left">validate</td>
<td style="text-align:left"><code>Function</code> or <code>Array of Functions</code></td>
<td style="text-align:left"><code>required</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
You can validate the field by passing function or array of functions. You can access to value of field in first argument and values of form in second argument. Based on your conditions if you return string the field will be invalid and the string will set to error property.
</td>
</tr>

<tr>
<td style="text-align:left">subscription</td>
<td style="text-align:left"><code>{ [string]: boolean }</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
The field will only re-render when these properties in field state changes. 
Field state will only includes these properties.
Could be useful for performance, If you pass nothing then everything will be subscribed.
</td>
</tr>

<tr>
<td style="text-align:left">allowNull</td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
When you pass it true, If the value of field be empty string or undefined, <code>null</code> will be set to state.
</td>
</tr>

<tr>
<td style="text-align:left">component</td>
<td style="text-align:left">
	<code>string</code>
</td>
<td style="text-align:left">
	<code>undefined</code>
</td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
Will create native inputs.
You can also create them by your self but these are ready to use.
 Enum <code>['input', 'select', 'textarea']</code>
</td>
</tr>

<tr>
<td style="text-align:left">type (only for native input)</td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>undefined</code>
</td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
When you want to use native inputs, You should pass type of the input.
Enum <code>['checkbox', 'text', 'email', 'password', 'radio']</code>
</td>
</tr>

<tr>
<td style="text-align:left">placeholder (only for native input)</td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
placeholder of native input
</td>
</tr>

<tr>
<td style="text-align:left">value (only for native input)</td>
<td style="text-align:left"><code>string, number, boolean, undefined</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
Value of field, For <code>radio</code>, <code>checkbox</code>, <code>select</code>. <br/>
<code>checkbox</code>: If you have several checkboxes with different values, the value will be array of values which has been checked by user otherwise the values will be boolean (checked) <br/>
</td>
</tr>

<tr>
<td style="text-align:left">multiple (only for native select)</td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
Will enable the multiple feature for native select. value of field will be array of selected options
</td>
</tr>

<tr>
<td style="text-align:left">disabled (only for native select)</td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4">
Will disable the native input
</td>
</tr>

</tbody>
</table>

## Field `:props`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/><br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/><br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/><br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
