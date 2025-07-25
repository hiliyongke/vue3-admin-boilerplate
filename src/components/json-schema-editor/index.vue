<template>
  <div class="json-schema-editor">
    <t-row
      class="row"
      :gutter="10"
    >
      <t-col
        :span="4"
        class="col-name"
      >
        <div
          :style="{ marginLeft: `${25 * deep}px` }"
          class="col-name-c"
        >
          <t-button
            v-if="pickValue.type === 'object'"
            variant="text"
            style="color: rgba(0, 0, 0, 0.65)"
            @click="hidden = !hidden"
          >
            <ChevronRightIcon
              v-if="hidden"
              slot="icon"
            />
            <ChevronDownIcon
              v-else
              slot="icon"
            />
          </t-button>
          <span
            v-else
            style="display: inline-block; width: 32px"
          ></span>
          <t-input
            :disabled="disabled || root"
            :default-value="pickKey"
            class="col-name-input"
            @blur="onInputName"
          />
        </div>
        <t-popup v-if="root">
          <template #content>{{ local['checked_all'] }}</template>
          <t-checkbox
            :disabled="!isObject && !isArray"
            class="col-name-required"
            @change="onRootCheck"
          />
        </t-popup>
        <t-popup v-else>
          <template #content>{{ local['required'] }}</template>
          <t-checkbox
            v-model="checked"
            :disabled="isItem"
            class="col-name-required"
            @change="onCheck"
          />
        </t-popup>
      </t-col>
      <t-col :span="2">
        <t-select
          v-model="pickValue.type"
          :disabled="disabledType"
          class="col-type"
          @change="onChangeType"
        >
          <t-option
            v-for="t in TYPE_NAME"
            :key="t"
            :value="t"
            :label="t"
          >
            {{ t }}
          </t-option>
        </t-select>
      </t-col>
      <t-col :span="3">
        <t-input
          v-model="pickValue.title"
          class="col-title"
          :placeholder="local['title']"
        />
      </t-col>
      <t-col
        :span="3"
        class="col-setting"
      >
        <t-popup>
          <template #content>{{ local['adv_setting'] }}</template>
          <t-button
            variant="text"
            class="setting-icon"
            @click="onSetting"
          >
            <SettingIcon slot="icon" />
          </t-button>
        </t-popup>
        <t-popup v-if="isObject">
          <template #content>{{ local['add_child_node'] }}</template>
          <t-button
            variant="text"
            class="plus-icon"
            @click="addChild"
          >
            <AddIcon slot="icon" />
          </t-button>
        </t-popup>
        <t-popup v-if="!root && !isItem">
          <template #content>{{ local['remove_node'] }}</template>
          <t-button
            variant="text"
            class="close-icon"
            @click="removeNode"
          >
            <CloseIcon slot="icon" />
          </t-button>
        </t-popup>
      </t-col>
    </t-row>
    <template v-if="!hidden && pickValue.properties && !isArray">
      <json-schema-editor
        v-for="(item, key, index) in pickValue.properties"
        :key="index"
        :value="{ [key]: item }"
        :parent="pickValue"
        :deep="deep + 1"
        :root="false"
        class="children"
        :lang="lang"
        :custom="custom"
      />
    </template>
    <template v-if="isArray">
      <json-schema-editor
        :value="{ items: pickValue.items }"
        :deep="deep + 1"
        disabled
        is-item
        :root="false"
        class="children"
        :lang="lang"
        :custom="custom"
      />
    </template>
    <t-dialog
      v-if="modalVisible"
      v-model:visible="modalVisible"
      :header="local['adv_setting']"
      mode="modeless"
      :confirm-btn="local['ok']"
      :cancel-btn="local['cancel']"
      width="900px"
      :on-confirm="handleOk"
      wrap-class-name="json-schema-editor-advanced-modal"
    >
      <h3>{{ local['base_setting'] }}</h3>
      <t-form
        label-align="top"
        :data="advancedValue"
      >
        <t-row :gutter="30">
          <t-col
            v-for="(item, key) in advancedValue"
            :key="key"
            :span="4"
          >
            <t-form-item :label="local[key]">
              <t-input-number
                v-if="
                  advancedAttr[key].type === 'integer' ||
                  advancedAttr[key].type === 'number'
                "
                v-model="advancedValue[key]"
                theme="column"
                style="width: 100%"
                :placeholder="key"
              />
              <span
                v-else-if="advancedAttr[key].type === 'boolean'"
                style="display: inline-block; width: 100%"
              >
                <t-switch v-model="advancedValue[key]" />
              </span>
              <t-textarea
                v-else-if="key === 'enum'"
                :default-value="enumText"
                :autosize="true"
                :placeholder="local['enum_msg']"
                @blur="changeEnumValue"
              />
              <t-select
                v-else-if="advancedAttr[key].type === 'array'"
                v-model="advancedValue[key]"
                style="width: 100%"
                :placeholder="local[key]"
              >
                <t-option value="">
                  {{ local['nothing'] }}
                </t-option>
                <t-option
                  v-for="t in advancedAttr[key].enums"
                  :key="t"
                  :value="t"
                  :label="t"
                >
                  {{ t }}
                </t-option>
              </t-select>
              <t-input
                v-else
                v-model="advancedValue[key]"
                style="width: 100%"
                :placeholder="key"
              />
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
      <h3 v-show="custom">{{ local['add_custom'] }}</h3>
      <t-form v-show="custom">
        <t-row :gutter="30">
          <t-col
            v-for="item in customProps"
            :key="item.key"
            :span="4"
            style="margin-bottom: 10px"
          >
            <t-form-item :label="item.key">
              <t-input
                v-model="item.value"
                style="width: calc(100% - 30px)"
              />
              <t-button
                variant="text"
                style="width: 30px"
                @click="removeCustomNode(item.key)"
              >
                <CloseIcon slot="icon" />
              </t-button>
            </t-form-item>
          </t-col>
          <t-col
            v-show="addProp.key != undefined"
            :span="4"
          >
            <t-form-item>
              <template #label>
                <t-input
                  v-model="addProp.key"
                  style="width: 100px"
                />
              </template>

              <t-input
                v-model="addProp.value"
                style="width: 90%; margin-left: 10%"
              />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item>
              <t-button
                v-if="customing"
                variant="text"
                @click="confirmAddCustomNode(null)"
              >
                <CheckIcon slot="icon" />
              </t-button>
              <t-popup
                v-else
                :content="local['add_custom']"
              >
                <t-button
                  variant="text"
                  @click="addCustomNode"
                >
                  <AddIcon slot="icon" />
                </t-button>
              </t-popup>
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
      <h3>{{ local['preview'] }}</h3>
      <pre style="width: 100%">{{ completeNodeValue }}</pre>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  SettingIcon
} from 'tdesign-icons-vue-next';
import { isNull } from './util';
import { TYPE_NAME, TYPE, SchemaType, Wrapper } from './type/type';
import LocalProvider from './local-provider';

interface Schema {
  [key: string]: any;
}

interface CustomProp {
  key: string;
  value: any;
}

export default defineComponent({
  name: 'JsonSchemaEditor',
  components: {
    AddIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CloseIcon,
    SettingIcon
  },
  props: {
    value: {
      type: Object as PropType<Record<string, Schema>>,
      required: true
    },
    disabled: {
      //name不可编辑，根节点name不可编辑,数组元素name不可编辑
      type: Boolean,
      default: false
    },
    disabledType: {
      //禁用类型选择
      type: Boolean,
      default: false
    },
    isItem: {
      //是否数组元素
      type: Boolean,
      default: false
    },
    deep: {
      // 节点深度，根节点deep=0
      type: Number,
      default: 0
    },
    root: {
      //是否root节点
      type: Boolean,
      default: true
    },
    parent: {
      //父节点
      type: Object as PropType<Schema | null>,
      default: null
    },
    custom: {
      //enable custom properties
      type: Boolean,
      default: false
    },
    lang: {
      // i18n language
      type: String as PropType<'zh_CN' | 'en_US'>,
      default: 'zh_CN'
    }
  },
  data(): {
    TYPE_NAME: typeof TYPE_NAME;
    hidden: boolean;
    countAdd: number;
    modalVisible: boolean;
    advancedValue: Record<string, any>;
    addProp: Partial<CustomProp>;
    customProps: CustomProp[];
    customing: boolean;
    local: Record<string, string>;
  } {
    return {
      TYPE_NAME,
      hidden: false,
      countAdd: 1,
      modalVisible: false,
      advancedValue: {},
      addProp: {}, // 自定义属性
      customProps: [],
      customing: false,
      local: LocalProvider(this.lang)
    };
  },
  computed: {
    pickValue(): Schema {
      return Object.values(this.value)[0];
    },
    pickKey(): string {
      return Object.keys(this.value)[0];
    },
    isObject(): boolean {
      return this.pickValue.type === 'object';
    },
    isArray(): boolean {
      return this.pickValue.type === 'array';
    },
    checked(): boolean {
      return !!(
        this.parent &&
        this.parent.required &&
        this.parent.required.indexOf(this.pickKey) >= 0
      );
    },
    advanced(): Wrapper {
      return TYPE[this.pickValue.type as SchemaType];
    },
    advancedAttr(): Record<string, any> {
      return TYPE[this.pickValue.type as SchemaType].attr;
    },
    ownProps(): string[] {
      return [
        'type',
        'title',
        'properties',
        'items',
        'required',
        ...Object.keys(this.advancedAttr)
      ];
    },
    advancedNotEmptyValue(): Record<string, any> {
      const jsonNode = { ...this.advancedValue };
      for (const key in jsonNode) {
        if (isNull(jsonNode[key])) {
          delete jsonNode[key];
        }
      }
      return jsonNode;
    },
    completeNodeValue(): Schema {
      const t: Record<string, any> = {};
      const basicValue = { ...this.pickValue };
      for (const item of this.customProps) {
        t[item.key] = item.value;
      }
      this._pickDiffKey().forEach(key => delete basicValue[key]);
      return { ...basicValue, ...t, ...this.advancedNotEmptyValue };
    },
    enumText(): string {
      const t = this.advancedValue['enum'];
      if (!t || !t.length) return '';
      return t.join('\n');
    }
  },
  methods: {
    onInputName(e: string) {
      const oldKey = this.pickKey;
      const newKey = e;
      if (oldKey === newKey || !this.parent?.properties) return;

      const nodeValue = this.parent.properties[oldKey];
      delete this.parent.properties[oldKey];
      this.parent.properties[newKey] = nodeValue;

      const requireds = this.parent.required || [];
      const oldIndex = requireds.indexOf(oldKey);
      if (requireds.length > 0 && oldIndex > -1) {
        requireds.splice(oldIndex, 1);
        requireds.push(newKey);
        this.parent.required = [...new Set(requireds)];
      }
    },
    onChangeType() {
      this.parseCustomProps();
      this.customProps.forEach(item => {
        delete this.pickValue[item.key];
      });
      this.customProps = [];

      delete this.pickValue.properties;
      delete this.pickValue.items;
      delete this.pickValue.required;
      delete this.pickValue.format;
      delete this.pickValue.enum;

      if (this.isArray) {
        this.pickValue.items = { type: 'string' };
      }
    },
    onCheck(checked: boolean) {
      if (this.parent) {
        this._checked(checked, this.parent);
      }
    },
    onRootCheck(checked: boolean) {
      this._deepCheck(checked, this.pickValue);
    },
    changeEnumValue(e: string) {
      const pickType = this.pickValue.type;
      const value = e;
      const arr = value.split('\n');

      if (pickType === 'string') {
        this.advancedValue.enum = arr;
      } else {
        if (arr.length === 0 || (arr.length === 1 && arr[0] === '')) {
          this.advancedValue.enum = null;
        } else {
          this.advancedValue.enum = arr.map(item => +item);
        }
      }
    },
    _deepCheck(checked: boolean, node: Schema) {
      if (node.type === 'object' && node.properties) {
        if (checked) {
          node.required = Object.keys(node.properties);
        } else {
          delete node.required;
        }
        Object.keys(node.properties).forEach(key =>
          this._deepCheck(checked, node.properties[key])
        );
      } else if (
        node.type === 'array' &&
        node.items &&
        node.items.type === 'object'
      ) {
        if (checked) {
          node.items.required = Object.keys(node.items.properties);
        } else {
          delete node.items.required;
        }
        Object.keys(node.items.properties).forEach(key =>
          this._deepCheck(checked, node.items.properties[key])
        );
      }
    },
    _checked(checked: boolean, parent: Schema) {
      let required = parent.required;
      if (checked) {
        if (!required) {
          parent.required = [];
        }
        required = parent.required;
        if (required.indexOf(this.pickKey) === -1) {
          required.push(this.pickKey);
        }
      } else {
        if (required) {
          const pos = required.indexOf(this.pickKey);
          if (pos >= 0) {
            required.splice(pos, 1);
          }
          if (required.length === 0) {
            delete parent.required;
          }
        }
      }
    },
    addChild() {
      const name = this._joinName();
      const type = 'string';
      const node = this.pickValue;
      if (!node.properties) {
        node.properties = {};
      }
      const props = node.properties;
      props[name] = { type };
    },
    parseCustomProps() {
      const ownProps = this.ownProps;
      Object.keys(this.pickValue).forEach(key => {
        if (ownProps.indexOf(key) === -1) {
          this.confirmAddCustomNode({ key, value: this.pickValue[key] });
        }
      });
    },
    addCustomNode() {
      this.addProp = { key: this._joinName(), value: '' };
      this.customing = true;
    },
    removeCustomNode(key: string) {
      const index = this.customProps.findIndex(item => item.key === key);
      if (index > -1) {
        this.customProps.splice(index, 1);
      }
    },
    confirmAddCustomNode(prop: CustomProp | null) {
      const p = prop || this.addProp;
      if (!p?.key) return;
      const existKey = this.customProps.some(item => item.key === p.key);
      if (existKey) return;
      this.customProps.push(p as CustomProp);
      this.addProp = {};
      this.customing = false;
    },
    removeNode() {
      if (this.parent?.properties) {
        const { properties, required } = this.parent;
        delete properties[this.pickKey];
        if (required) {
          const pos = required.indexOf(this.pickKey);
          if (pos >= 0) {
            required.splice(pos, 1);
          }
          if (required.length === 0) {
            delete this.parent.required;
          }
        }
      }
    },
    _joinName(): string {
      return `field_${this.deep}_${this.countAdd++}`;
    },
    onSetting() {
      this.modalVisible = true;
      this.advancedValue = { ...this.advanced.value };
      for (const k in this.advancedValue) {
        if (this.pickValue[k]) {
          this.advancedValue[k] = this.pickValue[k];
        }
      }
      this.parseCustomProps();
    },
    handleOk() {
      this.modalVisible = false;
      for (const key in this.advancedValue) {
        if (isNull(this.advancedValue[key])) {
          delete this.pickValue[key];
        } else {
          this.pickValue[key] = this.advancedValue[key];
        }
      }
      const diffKey = this._pickDiffKey();
      diffKey.forEach(key => delete this.pickValue[key]);
      for (const item of this.customProps) {
        this.pickValue[item.key] = item.value;
      }
    },
    _pickDiffKey(): string[] {
      const keys = Object.keys(this.pickValue);
      return keys.filter(item => this.ownProps.indexOf(item) === -1);
    }
  }
});
</script>
<style scoped>
.json-schema-editor .row {
  display: flex;
  margin: 12px;
}
.json-schema-editor .row .col-name {
  display: flex;
  align-items: center;
}
.json-schema-editor .row .col-name .col-name-c {
  display: flex;
  align-items: center;
}
.json-schema-editor .row .col-name .col-name-required {
  padding-left: 5px;
  text-align: center;
  flex: 0 0 24px;
}
.json-schema-editor .row .col-type {
  width: 100%;
}
.json-schema-editor .row .col-setting {
  display: inline-block;
}
.json-schema-editor .row .setting-icon {
  color: rgba(0, 0, 0, 0.45);
  border: none;
}
.json-schema-editor .row .plus-icon {
  color: #888888;
  border: none;
}
.json-schema-editor .row .close-icon {
  color: #888888;
  border: none;
}
.json-schema-editor-advanced-modal {
  min-width: 600px;
  color: rgba(0, 0, 0, 0.65);
}
.json-schema-editor-advanced-modal pre {
  width: 50%;
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  font-family: monospace;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.json-schema-editor-advanced-modal h3 {
  display: block;
  padding: 0 8px;
  border-left: 3px solid #1890ff;
}
.json-schema-editor-advanced-modal {
  display: flex;
}
.json-schema-editor-advanced-modal {
  flex: 1;
}
</style>
