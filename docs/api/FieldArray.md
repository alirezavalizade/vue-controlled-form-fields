# `<FieldArray />`

```js
import { FieldArray } from 'vue-controlled-form-fields';
```

#### It's a helper for having arrays on your form.

# Usage

```vue
<c-form>
	 <field-array name="experiences">
     	<div slot-scope="{ fields }">
        	<div v-for="(name, i) in fields.map()" :key="name">
            	<h2>Experience {{ i + 1 }}</h2>
				 <field :name="`${name}.title`" :validate="[required]">
	                <input-text label="Title" />
                </field>
                <field :name="`${name}.role`" :validate="[required]">
                	<input-text label="Role" />
                </field>
                <!---REMOVING ${i} ROW--->
                <button
                  type="danger"
                  icon="delete"
                  @click="fields.remove(i)"
                  size="small"
                  shape="circle"
                />
            </div>
            <!---ADDIND NEW ROW--->
            <button
	          style="margin-bottom:0"
    	      type="primary"
        	  @click="fields.push({})"
            >
            	Add more
            </button>
        </div>
     </field-array>
</c-form>
```

`name`:

## Field `:props`

##### [Same with `<Field />`](./Field.md)

<br/>

## Field `{}State`

##### [Same with `<Field />`](./Field.md)

<br/>

## Field `Methods()` (fields[method])

<table>
<thead>
<tr>
<th style="text-align:left">Properties</th>
<th style="text-align:left">Parameters</th>
<th style="text-align:left">Example</th>
</tr>
</thead>
<tbody>

<tr>
<td style="text-align:left">fields.map</td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
It'll return array of names including indexes to create fields. each name is like this <code>name[0]</code>, <code>name[1]</code>, <code>name[2]</code>.
</td>
</tr>

<tr>
<td style="text-align:left">fields.push</td>
<td style="text-align:left"><code>number</code> => index of new item</td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will push new item to value of field, the result is you will have new field when doing a loop in <code>fields.map()</code>
</td>
</tr>

<tr>
<td style="text-align:left">fields.remove</td>
<td style="text-align:left"><code>number</code> => index of new item</td>
<td style="text-align:left"><a href="">Link</a></td>
</tr>
<tr >
<td style="text-align:left" colspan="3">
Will remove a new item from value.
</td>
</tr>

</body>
</table>
