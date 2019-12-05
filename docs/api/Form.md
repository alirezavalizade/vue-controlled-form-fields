# `<Form />`

```js
import { Form as CForm } from 'vue-controlled-form-fields';
```

**Form is a state manager and provider which uses the Vue's power and Reactivity to provide the state and functionality to children or the component which the Form has been defined and used.**

## Form `:props`

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
<td style="text-align:left">submit</td>
<td style="text-align:left"><code>Function</code> or <code>Promise</code></td>
<td style="text-align:left"><code>required</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
Will return current values of the form in case of there wasn't any validation errors in form state. The touched `property` in all fields states will be set to true. If you return a `Promise` in submit function `submitting` property in form state will be set to true after resolving will be set to false.
</td>
</tr>
<tr>
<td style="text-align:left">initialValues</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
Will initialize the form on created life cycle, if it's changes the form will
re-initialized. the fields with property names will be registered before mounting the field components.
</td>
</tr>
<tr>
<td style="text-align:left">keepDirtyOnReinitialize</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
When you pass true, After re-initializing the form, The dirty `property` in all fields states won't change. will be same as it was before. But by default which is false, after re-initializing dirty properties will be set to false.
</td>
</tr>
<tr>
<td style="text-align:left">validate</td>
<td style="text-align:left"><code>Function</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
You can validate your fields by passing pure functions and returning an object with the same name of your field. 
</td>
</tr>
<tr>
<td style="text-align:left">validateOnBlur</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
Validation functions will be called after triggering @blur function. This could be effective when you have more than 1000 fields at the same page.
</td>
</tr>
<tr>
<td style="text-align:left">destroyOnUnregister</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
If you pass it true, When the field has been removed from DOM the state of field will be there.
</td>
</tr>
</tbody>
</table>

## Form `@events`

<table>
<thead>
<tr>
<th style="text-align:left">Events</th>
<th style="text-align:left">Parameters</th>
<th style="text-align:left">default</th>
<th style="text-align:left">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">@created</td>
<td style="text-align:left"><code>FormState</code> including <code>Form Object</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
This event occurs before rendering the form in DOM. Could be useful when you need to use subscribe the form state or use form methods in the current component which the form has been defined.
</td>
</tr>
<tr>
<td style="text-align:left"><code>@---formState</code> properties</td>
<td style="text-align:left">Value of the subscribed property in form state</td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="4=">
You can listen to changes of single property of form state. e.g. <code>@values</code>,
<code>@dirty</code>, <code>@submitting</code>. <br/>
Won't be triggered if you do not pass the property it as subscription items. If you pass nothing by default will be trigger.
</td>
</tr>
</tbody>
</table>

## Form `{}State`

Each Form and Field has a state which includes some properties which have special meaning and they happened in the special time.

<table>
<thead>
<tr>
<th style="text-align:left">Properties</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">dirty</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will be true if the form has any fields with dirty = true
</td>
</tr>

<tr>
<td style="text-align:left">valid</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will be true if all the fields hasn't any errors
</td>
</tr>

<tr>
<td style="text-align:left">invalid</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will be true if a field has error
</td>
</tr>

<tr>
<td style="text-align:left">visited</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will be true if the form has any fields with visited = true
</td>
</tr>

<tr>
<td style="text-align:left">modified</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will be true if the form has any fields with modified = true
</td>
</tr>

<tr>
<td style="text-align:left">pristine</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Will be true if the form has any fields with pristine = true

</td>
</tr>

<tr>
<td style="text-align:left">touched</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Will be true if the form has any fields with touched = true

</td>
</tr>

<tr>
<td style="text-align:left">active</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Name of the field which user focused on it, will be disapear when blur() has been called

</td>
</tr>

<tr>
<td style="text-align:left">submitting</td>
<td style="text-align:left"><code>Boolean</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Will be true if submit method returns <code>Promise</code>

</td>
</tr>

<tr>
<td style="text-align:left">values</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Current values of the form

</td>
</tr>

<tr>
<td style="text-align:left">errors</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

Current errors of the form

</td>
</tr>

<tr>
<td style="text-align:left">dirtyFields</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

List of dirty fields

</td>
</tr>

<tr>
<td style="text-align:left">modifiedFields</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

List of modified fields

</td>
</tr>

<tr>
<td style="text-align:left">visitedFields</td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">

List of visited fields

</td>
</tr>

<tr>
<td style="text-align:left">initialValues</td>
<td style="text-align:left"><code>Object</code> or <code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
InitialValues which passed to form as a prop or through the form.initialize() method
</td>
</tr>

<tr>
<td style="text-align:left"><a href="">[form]()</a></td>
<td style="text-align:left"><code>Object</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Has several methods for manipulating the state and getting state or specific property and <a href="">more</a>.
</td>
</tr>

</tbody>
</table>

We can access to form state in two ways:

1. `slot-scope` in template

```js
<template>
  <c-form>
  	<div slot-scope="formState">
       <field name="username" component="input" type="text" />
       <button :disabled="formState.invalid || formState.pristine"></button>
     </div>
  </c-form>
</template>
```

2. Life cycle hooks`@created` and `form.subscribe`

```js
<template>
  <c-form @change="onChangeFormState" @created="onFormCreated">
  	<field name="username" component="input" type="text" />
  </c-form>
</template>

<script>
export default {
  data() {
    return {
		form: null
    };
  },
  mounted() {
  	const unsubscribe = this.form.subscribe(state => {
    	console.log(state);
    });
  },
  methods: {
  	onFormCreated(form) {
    	this.form = form;
    },
    onChangeFormState({ values }) {
    	console.log(values);
    }
  }
};
</script>
```

Your listeners can be specific and listen only for one key and the changes of it, like `@errors`, `@values`. Actually your `$listener`s are listening to changes by `form.subscribe(callback, { ...subscription })`.

## Form Methods

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
