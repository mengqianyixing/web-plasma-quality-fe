<script lang="tsx">
  import { defineComponent, useAttrs, PropType, ref } from 'vue';
  import { debounce } from 'lodash-es';

  export default defineComponent({
    props: {
      value: {
        type: [String, Number] as PropType<string | number>,
      },
      placeholder: {
        type: String as PropType<string>,
        default: '请扫描',
      },
      size: {
        type: String as PropType<'lg' | 'small'>,
        default: 'default',
      },
    },
    setup(props, { emit }) {
      const attr = useAttrs();
      const code = ref('');
      const readOnly = ref(false);
      let firstCode = '';
      let time = 0;
      const _update = debounce(() => {
        readOnly.value = false;
        code.value = '';
      }, 100);
      const _enter = debounce(() => {
        if (code.value.length < 2) {
          code.value = '';
          return;
        }
        emit('enter');
        setTimeout(_update, 100);
      }, 100);
      const _reset = debounce(() => {
        time = 0;
      }, 1000);
      function keyupEvent(e: KeyboardEvent) {
        if (['Shift', 'Process'].includes(e.key)) return;
        const now = Date.now();
        if (time === 0 && /^[0-9a-zA-Z]{1}$/.test(e.key)) {
          firstCode = e.key.toUpperCase();
          time = now;
        }
        console.log('current key', e.key, now - time);
        if (now - time < 40 && time !== now) {
          readOnly.value = true;
          time = now;
          if (/^[0-9a-zA-Z]{1}$/.test(e.key)) {
            code.value = firstCode + code.value.toUpperCase() + e.key;
            firstCode = '';
            emit('change', code.value);
            emit('scan-change', code.value);
          }
        }
        _enter();
        _reset();
      }
      function inputEvent(e) {
        if (code.value === '') {
          emit('scanChange', e.target.value);
          emit('change', e.target.value);
        }
      }
      return () => (
        <input
          class={['scan-input', props.size]}
          {...attr}
          placeholder={props.placeholder}
          value={props.value}
          onInput={inputEvent.bind(null)}
          readonly={readOnly.value}
          onKeyup={keyupEvent.bind(null)}
        ></input>
      );
    },
  });
</script>
<style lang="scss" scoped>
  .scan-input {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    order: 1px solid rgb(217 217 217);
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 4px 11px;
    transition: all 0.2s;
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    border-color: #d9d9d9;
    background-color: #fff;
    color: rgb(0 0 0 / 88%);
    font-size: 14px;
    list-style: none;

    &.lg {
      padding: 6.5px 11px;
      font-size: 16px;
    }

    &.small {
      padding: 0 7px;
    }

    &:disabled {
      border-color: #d9d9d9;
      opacity: 1;
      background-color: rgb(0 0 0 / 4%);
      box-shadow: none;
      color: rgb(0 0 0 / 25%);
      cursor: not-allowed;
    }

    &:focus {
      border-color: #2a7dc9;
      outline: 0;
      box-shadow: 0 0 0 2px rgb(0 155 228 / 11%);
      border-inline-end-width: 1px;
    }

    &::placeholder {
      color: #d5d6d7;
    }
  }
</style>
